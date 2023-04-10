import { debounce } from "../utils.js";

// CONSTANTS
const DEBOUNCE_DELAY = 200;

// ELEMENTS
const nameFilter = document.getElementById("nameFilter");
const sarIdFilter = document.getElementById("sarIdFilter");
const roleFilter = document.getElementById("roleFilter");
const ptsFilter = document.getElementById("ptsFilter");
const poFilter = document.getElementById("poFilter");
// const phoneFilter = document.getElementById("phoneFilter");
const mbFilter = document.getElementById("mbFilter");

// function to filter rows based on all filters
function filterRows(rows) {
  rows.forEach(function (row) {
    const name = row.querySelector("td:nth-child(2)").textContent.toLowerCase();
    const sarId = row
      .querySelector("td:nth-child(1)")
      .textContent.toLowerCase();
    const role = row
      .querySelector("td:nth-child(7)")
      .textContent.toLowerCase()
      .replace(/-/g, " ");
    const pts = row.querySelector("td:nth-child(8)").textContent.toLowerCase();
    const po = row
      .querySelector("td:nth-child(9)")
      .textContent.toLowerCase()
      .replace(/-/g, " ");
    // const phone = row.querySelector("td:nth-child(4)").textContent.toLowerCase();
    const mb = row.querySelector("td:nth-child(10)").textContent.toLowerCase();

    if (
      name.includes(nameFilter.value.toLowerCase()) &&
      sarId.includes(sarIdFilter.value.toLowerCase()) &&
      role.includes(roleFilter.value.toLowerCase().replace(/-/g, " ")) &&
      pts.includes(ptsFilter.value.toLowerCase()) &&
      po.includes(poFilter.value.toLowerCase().replace(/-/g, " ")) &&
      // phone.includes(phoneFilter.value.toLowerCase())
      mb.includes(mbFilter.value.toLowerCase())
    ) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// EVENT LISTENERS
nameFilter.addEventListener(
  "input",
  debounce(function (event) {
    const filterValue = event.target.value.toLowerCase();
    const rows = document.querySelectorAll(".user-row");
    filterRows(rows);
  }, DEBOUNCE_DELAY)
);

sarIdFilter.addEventListener(
  "input",
  debounce(function (event) {
    const filterValue = event.target.value.toLowerCase();
    const rows = document.querySelectorAll(".user-row");
    filterRows(rows);
  }, DEBOUNCE_DELAY)
);

roleFilter.addEventListener(
  "input",
  debounce(function (event) {
    const filterValue = event.target.value.toLowerCase().replace(/-/g, " ");
    const rows = document.querySelectorAll(".user-row");
    filterRows(rows);
  }, DEBOUNCE_DELAY)
);

ptsFilter.addEventListener(
  "input",
  debounce(function (event) {
    const filterValue = event.target.value.toLowerCase();
    const rows = document.querySelectorAll(".user-row");
    filterRows(rows);
  }, DEBOUNCE_DELAY)
);

poFilter.addEventListener(
  "input",
  debounce(function (event) {
    const filterValue = event.target.value.toLowerCase().replace(/-/g, " ");
    const rows = document.querySelectorAll(".user-row");
    filterRows(rows);
  }, DEBOUNCE_DELAY)
);

/*
phoneFilter.addEventListener(
  "input",
  debounce(function (event) {
    const filterValue = event.target.value.toLowerCase();
    const rows = document.querySelectorAll(".user-row");
    filterRows(rows);
  }, DEBOUNCE_DELAY)
);
*/

mbFilter.addEventListener(
  "input",
  debounce(function (event) {
    const filterValue = event.target.value.toLowerCase();
    const rows = document.querySelectorAll(".user-row");
    filterRows(rows);
  }, DEBOUNCE_DELAY)
);
