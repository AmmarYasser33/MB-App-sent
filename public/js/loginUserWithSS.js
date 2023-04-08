import { showAlert } from "./utils.js";
import { auth } from "./databaseConfig.js";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";

const authForm = document.querySelector("#formAuthentication");
const sendBtn = document.getElementById("sign-in-button");
const verifyBtn = document.getElementById("verify-btn");
const resendBtn = document.getElementById("resendBtn");
document.getElementById("authentication-wrapper-basic").style.display = "none";

if (!window.recaptchaVerifier) {
  window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "normal",
      callback: (response) => {
        signup();
      },
    },
    auth
  );
}
recaptchaVerifier.render().then((widgetId) => {
  window.recaptchaWidgetId = widgetId;
});

if (sendBtn) sendBtn.addEventListener("click", signup);
function signup(e) {
  e.preventDefault();

  const sarid = document.querySelector("#SARID").value;

  if (!sarid) {
    showAlert("error", "Please enter a valid SAR ID");
    return;
  }

  axios
    .post("/api/team/login", { sarid })
    .then((res) => {
      if (res.data.status === "success") {
        sendSMS(res.data.data);
      } else {
        showAlert("error", "Invalid SAR ID");
        return;
      }
    })
    .catch((err) => {
      showAlert("error", `Error: ${err.message ? err.message : err}`);
    });
}

function sendSMS(user) {
  if (!user) {
    showAlert("error", "Invalid SAR ID");
    return;
  }

  const phoneNumber = `+${user.phone}`;
  const appVerifier = window.recaptchaVerifier;

  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;

      showAlert("success", "SMS sent successfully");

      document.getElementById("showUserPhone").textContent = `${"*".repeat(
        user.phone.length - 4
      )}${user.phone.slice(-4)}`;

      setTimeout(() => {
        document.querySelector(".container-xxl").style.display = "none";
        document.getElementById("authentication-wrapper-basic").style.display =
          "flex";
      }, 500);
    })
    .catch((error) => {
      showAlert("error", "SMS not sent! " + error.message);
    });
}

if (verifyBtn) verifyBtn.addEventListener("click", verify);
function verify(e) {
  e.preventDefault();

  const code = getCodeFromOTPInput();
  if (code.length !== 6) {
    showAlert("error", "Please enter a valid code");
    return;
  }

  if (!window.confirmationResult) {
    showAlert("error", "Please re-verfiy captcha");

    setTimeout(() => {
      window.location.reload();
    }, 1000);

    return;
  }

  confirmationResult
    .confirm(code)
    .then((result) => {
      showAlert("success", "Welcome");
      setTimeout(() => {
        window.location.assign("/index");
      }, 1100);
    })
    .catch((error) => {
      showAlert("error", "Bad verification code");
    });
}

resendBtn.addEventListener("click", () => {
  axios.get("/api/team/auth/logout");

  setTimeout(() => {
    window.location.reload();
  }, 1100);
});

function getCodeFromOTPInput() {
  const dig1 = document.getElementById("digit-1").value;
  const dig2 = document.getElementById("digit-2").value;
  const dig3 = document.getElementById("digit-3").value;
  const dig4 = document.getElementById("digit-4").value;
  const dig5 = document.getElementById("digit-5").value;
  const dig6 = document.getElementById("digit-6").value;

  return `${dig1}${dig2}${dig3}${dig4}${dig5}${dig6}`;
}
