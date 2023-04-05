import { showAlert } from "../utils.js";
import { customEditForm } from "./customCarForm.js";

// *
// * submit add form
// *

const addCarBtn = document.querySelector("#addCarBtn");

addCarBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const plateletter = document.querySelector("#addPlateLetters").value;
  const platenumber = document.querySelector("#addPlateNumbers").value;
  const year = document.querySelector("#addYear").value;
  const comment = document.querySelector(".addComment").value;

  const manufacturerSelectElement = document.querySelector("#addManufacturer");
  const manufacturer =
    manufacturerSelectElement.options[manufacturerSelectElement.selectedIndex]
      .value;

  const modelSelectElement = document.querySelector("#addModel");
  const model =
    modelSelectElement.options[modelSelectElement.selectedIndex].value;

  const mbSelectElement = document.querySelector("#addMB");
  const mb = mbSelectElement.options[mbSelectElement.selectedIndex].value;

  const statusSelectElement = document.querySelector("#addStatus");
  const status =
    statusSelectElement.options[statusSelectElement.selectedIndex].value;

  // prettier-ignore
  if ( !plateletter || !platenumber || !year || !manufacturer || !model || !mb || !status) {
      showAlert("error", "Please fill in all fields");
      return;
    }

  // prettier-ignore
  const newCar = { plateletter, platenumber, year, manufacturer,
          model, mb, status, comment };

  axios
    .post("/api/cars", newCar)
    .then((res) => {
      if (res.data.status === "success") {
        showAlert("success", "Car added successfully");
        window.setTimeout(() => {
          location.assign("/cars");
        }, 1100);
      } else {
        showAlert("error", "Error adding car");
      }
    })
    .catch((err) => {
      showAlert("error", `Error: ${err.message ? err.message : err}`);
    });
});

// *
// * show edit form with user data
// *

const showEditFormBtn = document.querySelectorAll("#showEditModelBtn");

showEditFormBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const id = e.target.parentElement.dataset.carid;
    let car = {};

    fetch(`/api/cars/${id}`)
      .then((res) => res.json())
      .then((data) => {
        car = data.data;

        const editForm = document.querySelector("#edititemForm");
        const html = customEditForm(
          car.manufacturer,
          car.model,
          car.year,
          car.plateletter,
          car.platenumber,
          car.mb,
          car.status,
          car.comment
        );

        editForm.innerHTML = html;

        addEvent();
      });
  });
});

// *
// * submit edit form
// *

function addEvent() {
  const saveBtn = document.querySelector("#btnSave");

  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const plateletter = document.querySelector("#editPlateLetters").value;
    const platenumber = document.querySelector("#editPlateNumbers").value;
    const year = document.querySelector("#editYear").value;
    const comment = document.querySelector(".editComment").value;

    const manufacturerSelectElement =
      document.querySelector("#editManufacturer");
    const manufacturer =
      manufacturerSelectElement.options[manufacturerSelectElement.selectedIndex]
        .value;

    const modelSelectElement = document.querySelector("#editModel");
    const model =
      modelSelectElement.options[modelSelectElement.selectedIndex].value;

    const mbSelectElement = document.querySelector("#editMB");
    const mb = mbSelectElement.options[mbSelectElement.selectedIndex].value;

    const statusSelectElement = document.querySelector("#editStatus");
    const status =
      statusSelectElement.options[statusSelectElement.selectedIndex].value;

    // prettier-ignore
    if ( !plateletter || !platenumber || !year || !manufacturer || !model || !mb || !status) {
        showAlert("error", "Please fill in all fields");
        return;
      }

    // prettier-ignore
    const editCar = { plateletter, platenumber, year, manufacturer,
            model, mb, status, comment };

    axios
      .patch(`/api/cars/${platenumber}${plateletter}`, editCar)
      .then((res) => {
        if (res.data.status === "success") {
          showAlert("success", "Car updated successfully");
          window.setTimeout(() => {
            location.assign("/cars");
          }, 1100);
        } else {
          showAlert("error", "Error updating car");
        }
      })
      .catch((err) => {
        showAlert("error", `Error: ${err.message ? err.message : err}`);
      });
  });
}
