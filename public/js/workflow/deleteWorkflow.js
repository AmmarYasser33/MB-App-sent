import { showAlert } from "../utils.js";

const deleteBtns = document.querySelectorAll("#deleteWorkflow");

deleteBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const workOrder = e.target.parentElement.dataset.workorder;

    const confirmDelete = confirm(
      "Are you sure you want to delete this workflow?"
    );

    if (confirmDelete) {
      axios
        .delete(`/api/workflow/${workOrder}`)
        .then((res) => {
          if (res.data.status === "success") {
            showAlert("success", "Workflow deleted successfully");
            window.setTimeout(() => {
              location.assign("/workflow");
            }, 1100);
          }
        })
        .catch((err) => {
          showAlert("error", err.response.data.message);
        });
    }
  });
});
