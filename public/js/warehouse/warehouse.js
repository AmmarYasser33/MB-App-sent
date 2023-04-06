import { showAlert } from "../utils.js";
import { customEditForm } from "./customWarehouseForm.js";

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

// *
// * show edit form with user data
// *

const showEditFormBtns = document.querySelectorAll("#showEditModelBtn");

showEditFormBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const serialNum = e.target.parentElement.dataset.warehouseserial;
    let warehouse = {};

    fetch(`/api/warehouse/${serialNum}`)
      .then((res) => res.json())
      .then((data) => {
        warehouse = data.data;

        const editForm = document.querySelector("#edititemForm");
        const html = customEditForm(
          warehouse.serialnumber,
          warehouse.partnumber,
          warehouse.name,
          warehouse.receiver,
          warehouse.from,
          warehouse.deliverymethod,
          warehouse.status,
          warehouse.date,
          warehouse.rack,
          warehouse.comment
        );

        editForm.innerHTML = html;

        addEvent();
      })
      .catch((err) => {
        showAlert("error", `Error: ${err.message ? err.message : err}`);
        setTimeout(() => {
          location.reload();
        }, 200);
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

    const serialnumber = document.querySelector("#editSerialNumber").value;
    const partnumber = document.querySelector("#editPartNumber").value;
    const name = document.querySelector("#editName").value;
    const receiver = document.querySelector("#editReciever").value;
    const from = document.querySelector("#editFrom").value;
    const rack = document.querySelector("#editTypeaheadBasic").value;
    const comment = document.querySelector(".editComment").value;

    const deliveryMethodSelectElement = document.querySelector(
      "#editDeliveryMethod"
    );
    const deliverymethod =
      deliveryMethodSelectElement.options[
        deliveryMethodSelectElement.selectedIndex
      ].value;

    const statusSelectElement = document.querySelector("#editStatus");
    const status =
      statusSelectElement.options[statusSelectElement.selectedIndex].value;

    const date = document.querySelector("#editmodalEditDate").value;

    // prettier-ignore
    if ( !serialnumber || !partnumber || !name || !receiver || !from || !rack || !deliverymethod || !status) {
        showAlert("error", "Please fill in all fields");
        return;
      }

    // prettier-ignore
    const newWarehouse = {partnumber, name, receiver, from, rack, deliverymethod, status, comment, date };

    axios
      .patch(`/api/warehouse/${serialnumber}`, newWarehouse)
      .then((res) => {
        if (res.data.status === "success") {
          showAlert("success", "Warehouse updated successfully");
          window.setTimeout(() => {
            location.assign("/warehouse");
          }, 1100);
        } else {
          showAlert("error", "Error updating warehouse");
        }
      })
      .catch((err) => {
        console.log(err);
        showAlert("error", `Error: ${err.message ? err.message : err}`);
      });
  });
}
