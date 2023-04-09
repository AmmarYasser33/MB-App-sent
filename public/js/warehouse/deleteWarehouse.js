import { showAlert } from "../utils.js";

const deleteBtns = document.querySelectorAll("#deleteWarehouse");

deleteBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const warehouseId = e.target.parentElement.dataset.warehouseid;

    const confirmDelete = confirm(
      "Are you sure you want to delete this Warehouse?"
    );

    if (confirmDelete) {
      axios
        .delete(`/api/warehouse/${warehouseId}`)
        .then((res) => {
          if (res.data.status === "success") {
            showAlert("success", "Employee deleted successfully");
            window.setTimeout(() => {
              location.assign("/warehouse");
            }, 1100);
          }
        })
        .catch((err) => {
          showAlert("error", err.response.data.message);
        });
    }
  });
});
