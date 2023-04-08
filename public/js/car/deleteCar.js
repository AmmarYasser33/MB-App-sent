import { showAlert } from "../utils.js";

const deleteBtns = document.querySelectorAll("#deleteCar");

deleteBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const carId = e.target.parentElement.dataset.carid;

    const confirmDelete = confirm("Are you sure you want to delete this car?");

    if (confirmDelete) {
      axios
        .delete(`/api/cars/${carId}`)
        .then((res) => {
          if (res.data.status === "success") {
            showAlert("success", "Car deleted successfully");
            window.setTimeout(() => {
              location.assign("/cars");
            }, 1100);
          }
        })
        .catch((err) => {
          showAlert("error", err.response.data.message);
        });
    }
  });
});
