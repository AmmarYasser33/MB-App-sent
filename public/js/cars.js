import { showAlert } from "./utils.js";

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
