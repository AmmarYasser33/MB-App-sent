import { showAlert } from "./utils.js";

const addWarehouseBtn = document.querySelector("#addWarehouseBtn");

addWarehouseBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const serialnumber = document.querySelector("#SerialNumber").value;
  const partnumber = document.querySelector("#PartNumber").value;
  const name = document.querySelector("#Name").value;
  const receiver = document.querySelector("#Receiver").value;
  const from = document.querySelector("#From").value;
  const rack = document.querySelector("#TypeaheadBasic").value;
  const comment = document.querySelector(".addComment").value;

  const deliveryMethodSelectElement = document.querySelector("#DeliveryMethod");
  const deliverymethod =
    deliveryMethodSelectElement.options[
      deliveryMethodSelectElement.selectedIndex
    ].value;

  const statusSelectElement = document.querySelector("#Status");
  const status =
    statusSelectElement.options[statusSelectElement.selectedIndex].value;

  const date = document.querySelector("#modalEditDate").value;

  // prettier-ignore
  if ( !serialnumber || !partnumber || !name || !receiver || !from || !rack || !deliverymethod || !status) {
      showAlert("error", "Please fill in all fields");
      return;
    }

  // prettier-ignore
  const newWarehouse = { serialnumber, partnumber, name, receiver, from, rack, deliverymethod, status, comment, date };

  axios
    .post("/api/warehouse", newWarehouse)
    .then((res) => {
      if (res.data.status === "success") {
        showAlert("success", "Warehouse added successfully");
        window.setTimeout(() => {
          location.assign("/warehouse");
        }, 1100);
      } else {
        showAlert("error", "Error adding warehouse");
      }
    })
    .catch((err) => {
      showAlert("error", `Error: ${err.message ? err.message : err}`);
    });
});
