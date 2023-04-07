import { debounce } from "../utils.js";

// CONSTANTS
const DEBOUNCE_DELAY = 200;

// ELEMENTS
const dateFilter = document.getElementById("dateFilter");
const workOrderFilter = document.getElementById("workOrderFilter");
const siteFilter = document.getElementById("siteFilter");
const typeFilter = document.getElementById("typeFilter");
const teamFilter = document.querySelector(".teamMembersFilter");
const statusFilter = document.getElementById("statusFilter");

// function to filter rows based on all filters
function filterRows(rows) {
  const dateFilterValue = dateFilter.value.toLowerCase();
  const workOrderFilterValue = workOrderFilter.value.toLowerCase();
  const siteFilterValue = siteFilter.value.toLowerCase();
  const typeFilterValue = typeFilter.value.toLowerCase();
  const teamFilterValue = teamFilter.value.toLowerCase();
  const statusFilterValue = statusFilter.value.toLowerCase();

  rows.forEach(function (row) {
    const date = row.querySelector("td:nth-child(1)").textContent.toLowerCase();
    const workOrder = row
      .querySelector("td:nth-child(2)")
      .textContent.toLowerCase();
    const site = row.querySelector("td:nth-child(3)").textContent.toLowerCase();
    const type = row.querySelector("td:nth-child(4)").textContent.toLowerCase();
    const team = row.querySelector("td:nth-child(6)").textContent.toLowerCase();
    const status = row
      .querySelector("td:nth-child(8)")
      .textContent.toLowerCase();

    if (
      date.includes(dateFilterValue) &&
      workOrder.includes(workOrderFilterValue) &&
      site.includes(siteFilterValue) &&
      type.includes(typeFilterValue) &&
      team.includes(teamFilterValue) &&
      status.includes(statusFilterValue)
    ) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// EVENT LISTENERS
dateFilter.addEventListener(
  "input",
  debounce(function (e) {
    const rows = document.querySelectorAll(".workflow-row");

    filterRows(rows);
  }, DEBOUNCE_DELAY)
);

workOrderFilter.addEventListener(
  "input",
  debounce(function (e) {
    const rows = document.querySelectorAll(".workflow-row");
    filterRows(rows);
  }, DEBOUNCE_DELAY)
);

siteFilter.addEventListener(
  "input",
  debounce(function (e) {
    const rows = document.querySelectorAll(".workflow-row");
    filterRows(rows);
  }, DEBOUNCE_DELAY)
);

typeFilter.addEventListener(
  "input",
  debounce(function (e) {
    const rows = document.querySelectorAll(".workflow-row");
    filterRows(rows);
  }, DEBOUNCE_DELAY)
);

teamFilter.addEventListener(
  "input",
  debounce(function (e) {
    const rows = document.querySelectorAll(".workflow-row");
    filterRows(rows);
  }, DEBOUNCE_DELAY)
);

statusFilter.addEventListener(
  "input",
  debounce(function (e) {
    const rows = document.querySelectorAll(".workflow-row");
    filterRows(rows);
  }, DEBOUNCE_DELAY)
);
