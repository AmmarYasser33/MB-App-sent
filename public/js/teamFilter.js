import { debounce } from "./utils.js";

// CONSTANTS
const DEBOUNCE_DELAY = 200;

// ELEMENTS
const nameFilter = document.getElementById("nameFilter");
const sarIdFilter = document.getElementById("sarIdFilter");
const roleFilter = document.getElementById("roleFilter");
const ptsFilter = document.getElementById("ptsFilter");
const poFilter = document.getElementById("poFilter");
const phoneFilter = document.getElementById("phoneFilter");

// FILTER FUNCTIONS
function filterByName(rows, filterValue) {
  rows.forEach(function (row) {
    const name = row.querySelector("td:nth-child(2)").textContent.toLowerCase();

    if (name.includes(filterValue)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

function filterBySarId(rows, filterValue) {
  rows.forEach(function (row) {
    const name = row.querySelector("td:nth-child(1)").textContent.toLowerCase();

    if (name.includes(filterValue)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

function filterByRole(rows, filterValue) {
  rows.forEach(function (row) {
    const name = row.querySelector("td:nth-child(7)").textContent.toLowerCase();

    if (name.includes(filterValue)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

function filterByPts(rows, filterValue) {
  rows.forEach(function (row) {
    const name = row.querySelector("td:nth-child(8)").textContent.toLowerCase();

    if (name.includes(filterValue)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

function filterByPo(rows, filterValue) {
  rows.forEach(function (row) {
    const name = row.querySelector("td:nth-child(9)").textContent.toLowerCase();

    if (name.includes(filterValue)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

function filterByPhone(rows, filterValue) {
  rows.forEach(function (row) {
    const name = row.querySelector("td:nth-child(4)").textContent.toLowerCase();

    if (name.includes(filterValue)) {
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
    filterByName(rows, filterValue);
  }, DEBOUNCE_DELAY)
);

sarIdFilter.addEventListener(
  "input",
  debounce(function (event) {
    const filterValue = event.target.value.toLowerCase();
    const rows = document.querySelectorAll(".user-row");
    filterBySarId(rows, filterValue);
  }, DEBOUNCE_DELAY)
);

roleFilter.addEventListener(
  "input",
  debounce(function (event) {
    const filterValue = event.target.value.toLowerCase().replace(/-/g, " ");
    const rows = document.querySelectorAll(".user-row");
    filterByRole(rows, filterValue);
  }, DEBOUNCE_DELAY)
);

ptsFilter.addEventListener(
  "input",
  debounce(function (event) {
    const filterValue = event.target.value.toLowerCase();
    const rows = document.querySelectorAll(".user-row");
    filterByPts(rows, filterValue);
  }, DEBOUNCE_DELAY)
);

poFilter.addEventListener(
  "input",
  debounce(function (event) {
    const filterValue = event.target.value.toLowerCase().replace(/-/g, " ");
    const rows = document.querySelectorAll(".user-row");
    filterByPo(rows, filterValue);
  }, DEBOUNCE_DELAY)
);

phoneFilter.addEventListener(
  "input",
  debounce(function (event) {
    const filterValue = event.target.value.toLowerCase();
    const rows = document.querySelectorAll(".user-row");
    filterByPhone(rows, filterValue);
  }, DEBOUNCE_DELAY)
);
