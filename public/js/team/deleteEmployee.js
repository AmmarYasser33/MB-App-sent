import { showAlert } from "../utils.js";

const deleteBtns = document.querySelectorAll("#deleteEmployee");

deleteBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const sarid = e.target.parentElement.dataset.userid;

    const confirmDelete = confirm(
      "Are you sure you want to delete this Employee?"
    );

    if (confirmDelete) {
      axios
        .delete(`/api/team/${sarid}`)
        .then((res) => {
          if (res.data.status === "success") {
            showAlert("success", "Employee deleted successfully");
            window.setTimeout(() => {
              location.assign("/team");
            }, 1100);
          }
        })
        .catch((err) => {
          showAlert("error", err.response.data.message);
        });
    }
  });
});
