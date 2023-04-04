import { showAlert } from "./utils.js";

const logoutBtn = document.getElementById("logoutUserBtn");
const teamMembers = document.getElementById("numberOfTeamMembers");

if (logoutBtn) logoutBtn.addEventListener("click", logoutUser);

async function logoutUser() {
  try {
    const res = await axios.get("/api/team/auth/logout");

    if (res.data.status === "success") {
      showAlert("success", "Logged out successfully!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1010);
    }
  } catch (err) {
    showAlert("error", "Error logging out! Try again.");
  }
}

axios.get("/api/team").then((res) => {
  teamMembers.textContent = `${res.data.results} Team Members in Your Team`;
});
