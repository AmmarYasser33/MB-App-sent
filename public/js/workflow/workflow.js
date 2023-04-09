import { showAlert, isValidTime } from "../utils.js";
import { customEditForm } from "./customWorkflowForm.js";

const addWorkflowBtn = document.querySelector("#addWorkflowBtn");

addWorkflowBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const date = document.querySelector("#addDate").value;
  const workorder = document.querySelector("#addWorkflowworkorder").value;
  const timein = document.querySelector("#addWorkflowTimein").value;
  const timeout = document.querySelector("#addWorkflowTimeout").value;
  const description = document.querySelector("#addWorkflowDescription").value;

  const selectElement = document.querySelector("#addselect2Multiple");
  const selectedOptions = Array.from(selectElement.selectedOptions);
  const team = selectedOptions.map((option) => option.value);

  const workflowSiteSelectElement = document.querySelector("#addWorkflowSite");
  const site =
    workflowSiteSelectElement.options[workflowSiteSelectElement.selectedIndex]
      .value;

  const typeSelectElement = document.querySelector("#addWorkflowType");
  const type = typeSelectElement.options[typeSelectElement.selectedIndex].value;

  const statusSelectElement = document.querySelector("#addWorkflowStatus");
  const status =
    statusSelectElement.options[statusSelectElement.selectedIndex].value;

  const workflowCarSelectElement = document.querySelector("#addWorkflowCar");
  const car =
    workflowCarSelectElement.options[workflowCarSelectElement.selectedIndex]
      .value;

  const responsibleTeamSelectElement =
    document.querySelector("#addWorkflowTeam");
  const responsibleteam =
    responsibleTeamSelectElement.options[
      responsibleTeamSelectElement.selectedIndex
    ].value;

  const level2SelectElement = document.querySelector("#addWorkflowL2");
  const level2Check =
    level2SelectElement.options[level2SelectElement.selectedIndex].value;
  const level2 =
    level2SelectElement.options[level2SelectElement.selectedIndex].value ===
    "No"
      ? false
      : true;

  // prettier-ignore
  if (!date || !workorder || !timein || !timeout || !description || !team || !site || !type || !status || !car || !responsibleteam || !level2Check) {
    showAlert("error", "Please fill in all fields");
    return;
  }

  if (!isValidTime(timein)) {
    showAlert("error", "Invalid time in format");
    return;
  }
  if (!isValidTime(timeout)) {
    showAlert("error", "Invalid time out format");
    return;
  }

  // prettier-ignore
  const newWorkflow = { date, workorder, timein, timeout, description, team, site, type, status, car, responsibleteam, level2 };

  axios
    .post("/api/workflow", newWorkflow)
    .then((res) => {
      if (res.data.status === "success") {
        showAlert("success", "Workflow added successfully");
        window.setTimeout(() => {
          location.assign("/workflow");
        }, 1100);
      } else {
        showAlert("error", "Error adding workflow");
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
let generalId;

showEditFormBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const workflowId = e.target.parentElement.dataset.workflowid;
    generalId = workflowId;
    let workflow = {};

    fetch(`/api/workflow/${workflowId}`)
      .then((res) => res.json())
      .then((data) => {
        workflow = data.data;

        axios.get("/api/cars").then((res2) => {
          const cars = res2.data.data;

          axios.get("/api/team").then((res3) => {
            const employees = res3.data.data;

            const editForm = document.querySelector("#editWorkflowForm");
            const html = customEditForm(
              workflow.date,
              employees,
              workflow.team,
              workflow.workorder,
              workflow.site,
              workflow.type,
              workflow.status,
              workflow.timein,
              workflow.timeout,
              workflow.description,
              cars,
              workflow.car,
              workflow.responsibleteam,
              workflow.level2
            );

            editForm.innerHTML = html;

            addEvent();
          });
        });
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

    const date = document.querySelector("#Date").value;
    const workorder = document.querySelector("#Workflowworkorder").value;
    const timein = document.querySelector("#WorkflowTimein").value;
    const timeout = document.querySelector("#WorkflowTimeout").value;
    const description = document.querySelector("#WorkflowDescription").value;

    const teamSelectElement = document.querySelector("#editselect2Multiple");
    const selectedOptions = Array.from(teamSelectElement.selectedOptions);
    const team = selectedOptions.map((option) => option.value);

    const siteSelectElement = document.querySelector("#WorkflowSite");
    const site =
      siteSelectElement.options[siteSelectElement.selectedIndex].value;

    const typeSelectElement = document.querySelector("#WorkflowType");
    const type =
      typeSelectElement.options[typeSelectElement.selectedIndex].value;

    const statusSelectElement = document.querySelector("#WorkflowStatus");
    const status =
      statusSelectElement.options[statusSelectElement.selectedIndex].value;

    const carSelectElement = document.querySelector("#WorkflowCar");
    const car = carSelectElement.options[carSelectElement.selectedIndex].value;

    const responsibleTeamSelectElement =
      document.querySelector("#WorkflowTeam");
    const responsibleteam =
      responsibleTeamSelectElement.options[
        responsibleTeamSelectElement.selectedIndex
      ].value;

    const level2SelectElement = document.querySelector("#WorkflowL2");
    const level2Check =
      level2SelectElement.options[level2SelectElement.selectedIndex].value;
    const level2 =
      level2SelectElement.options[level2SelectElement.selectedIndex].value ===
      "No"
        ? false
        : true;

    // prettier-ignore
    if (!date || !workorder || !timein || !timeout || !description || !team || !site || !type || !status || !car || !responsibleteam || !level2Check) {
      showAlert("error", "Please fill in all fields");
      return;
    }

    if (!isValidTime(timein)) {
      showAlert("error", "Invalid time in format");
      return;
    }

    if (!isValidTime(timeout)) {
      showAlert("error", "Invalid time out format");
      return;
    }

    // prettier-ignore
    const newWorkflow = { date, workorder, timein, timeout, description, team, site, type, status, car, responsibleteam, level2 };

    axios
      .patch(`/api/workflow/${generalId}`, newWorkflow)
      .then((res) => {
        if (res.data.status === "success") {
          showAlert("success", "Workflow updated successfully");
          window.setTimeout(() => {
            location.assign("/workflow");
          }, 1100);
        } else {
          showAlert("error", "Error updating workflow");
        }
      })
      .catch((err) => {
        showAlert("error", `Error: ${err.message ? err.message : err}`);
      });

    //
  });
}
