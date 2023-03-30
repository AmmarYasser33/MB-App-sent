document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".form-control.auth-input");

  inputs.forEach((input) => {
    input.addEventListener("keydown", (e) => {
      if (e.key >= 0 && e.key <= 9) {
        // continue if it's the last input
        if (input.nextElementSibling === null) return;
        input.value = "";
        setTimeout(() => input.nextElementSibling.focus(), 10);
      } else if (e.key === "Backspace") {
        // continue if it's the first input
        if (input.previousElementSibling === null) return;
        setTimeout(() => input.previousElementSibling.focus(), 10);
      } else {
        e.preventDefault();
      }
    });
  });
});
