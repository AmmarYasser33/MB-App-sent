import { showAlert } from "../utils.js";
import { customEditForm } from "./customTeamForm.js";

const addEmployeeForm = document.querySelector("#additemForm");

if (addEmployeeForm)
  addEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const sarid = document.querySelector("#addSARID").value;
    const nationalid = document.querySelector("#addNationalID").value;
    const name = document.querySelector("#addName").value;
    const email = document.querySelector("#addEmail").value;
    const phone = document.querySelector("#addPhoneNumber").value;

    const nationalitySelectElement = document.querySelector("#addNationality");
    const nationality =
      nationalitySelectElement.options[nationalitySelectElement.selectedIndex]
        .value;

    const roleSelectElement = document.querySelector("#addRole");
    const role =
      roleSelectElement.options[roleSelectElement.selectedIndex].value;

    const ptsSelectElement = document.querySelector("#addPTS");
    const pts = ptsSelectElement.options[ptsSelectElement.selectedIndex].value;

    const ptsExpiringDate = document.querySelector("#addPTSExpiringDate").value;

    const poSelectElement = document.querySelector("#addPO");
    const po = poSelectElement.options[poSelectElement.selectedIndex].value;

    const poNumber = document.querySelector("#addPONumber").value;

    const poExpiringDate = document.querySelector("#addPOExpiringDate").value;

    const mbSelectElement = document.querySelector("#addMB");
    const mb = mbSelectElement.options[mbSelectElement.selectedIndex].value;

    const comment = document.querySelector(".addComment").value;

    // prettier-ignore
    if (
      !sarid || !nationalid || !name || !email || !phone || !nationality || !role ||
      !pts || !ptsExpiringDate || !po || !poNumber || !poExpiringDate || !mb || !comment
    ) {
      showAlert("error", "Please fill in all fields");
      return;
    }

    // prettier-ignore
    const data = {
      sarid,  nationalid, name, email, phone, nationality, role, pts,
      ptsExpiringDate, po, poNumber, poExpiringDate, mb, comment,
    };

    axios
      .post("/api/team", data)
      .then((res) => {
        if (res.data.status === "success") {
          showAlert("success", "Employee added successfully");
          window.setTimeout(() => {
            location.assign("/team");
          }, 1100);
        } else {
          showAlert("error", "Error adding employee");
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
    const id = e.target.parentElement.dataset.userid;
    let user = {};

    fetch(`/api/team/${id}`)
      .then((res) => res.json())
      .then((data) => {
        user = data.data;

        const editForm = document.querySelector("#editrecord");
        const html = customEditForm(
          user.sarid,
          user.nationalid,
          user.name,
          user.email,
          user.phone,
          user.nationality,
          user.role,
          user.pts,
          user.ptsExpiringDate,
          user.po,
          user.poNumber,
          user.poExpiringDate,
          user.mb,
          user.comment
        );

        editForm.innerHTML = html;

        addEvent();
      });
  });
});

//

// *
// * submit edit form
// *

function addEvent() {
  const saveBtn = document.querySelector("#btnSave");

  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const sarid = document.querySelector("#editSARID").value;
    const nationalid = document.querySelector("#editNationalID").value;
    const name = document.querySelector("#editName").value;
    const email = document.querySelector("#editEmail").value;
    const phone = document.querySelector("#editPhoneNumber").value;

    const nationalitySelectElement = document.querySelector("#editNationality");
    const nationality =
      nationalitySelectElement?.options?.[
        nationalitySelectElement.selectedIndex
      ]?.value;

    const roleSelectElement = document.querySelector("#editRole");
    const role =
      roleSelectElement?.options?.[roleSelectElement.selectedIndex]?.value;

    const ptsSelectElement = document.querySelector("#editPTS");
    const pts =
      ptsSelectElement?.options?.[ptsSelectElement.selectedIndex]?.value;

    const ptsExpiringDate = document.querySelector(
      "#editPTSExpiringDate"
    ).value;

    const poSelectElement = document.querySelector("#editPO");
    const po = poSelectElement?.options?.[poSelectElement.selectedIndex]?.value;

    const poNumber = document.querySelector("#editPONumber").value;
    const poExpiringDate = document.querySelector("#editPOExpiringDate").value;

    const mbSelectElement = document.querySelector("#editMB");
    const mb = mbSelectElement?.options?.[mbSelectElement.selectedIndex]?.value;

    const comment = document.querySelector(".editComment").value;

    // prettier-ignore
    if (
       !nationalid || !name || !email || !phone || !nationality || !role ||
      !pts || !ptsExpiringDate || !po || !poNumber || !poExpiringDate || !mb || !comment
    ) {
      showAlert("error", "Please fill in all fields");
      return;
    }

    // prettier-ignore
    const data = {
       nationalid, name, email, phone, nationality, role, pts,
      ptsExpiringDate, po, poNumber, poExpiringDate, mb, comment,
    };

    axios
      .patch(`/api/team/${sarid}`, data)
      .then((res) => {
        if (res.data.status === "success") {
          showAlert("success", "Employee updated successfully");
          window.setTimeout(() => {
            location.assign("/team");
          }, 1100);
        } else {
          showAlert("error", "Error updating employee");
        }
      })
      .catch((err) => {
        showAlert("error", `Error: ${err.message ? err.message : err}`);
      });
  });
}
