import { showAlert } from "../utils.js";

const deleteBtns = document.querySelectorAll("#deleteWorkflow");

deleteBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const workflowId = e.target.parentElement.dataset.workflowid;

    const confirmDelete = confirm(
      "Are you sure you want to delete this workflow?"
    );

    if (confirmDelete) {
      axios
        .delete(`/api/workflow/${workflowId}`)
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
