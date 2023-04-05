import { debounce } from "../utils.js";

// CONSTANTS
const DEBOUNCE_DELAY = 200;

// ELEMENTS
const manufacturerFilter = document.getElementById("manufacturerFilter");
const statusFilter = document.getElementById("statusFilter");
const plateNumberFilter = document.getElementById("plateNumberFilter");

// function to filter rows based on all filters
function filterRows() {
  const manufacturerFilterValue = manufacturerFilter.value.toLowerCase();
  const statusFilterValue = statusFilter.value.toLowerCase();
  const plateNumberFilterValue = plateNumberFilter.value.toLowerCase();

  const rows = document.querySelectorAll(".car-row");

  rows.forEach(function (row) {
    const manufacturer = row
      .querySelector("td:nth-child(1)")
      .textContent.toLowerCase();
    const status = row
      .querySelector("td:nth-child(6)")
      .textContent.toLowerCase();
    const plateNumber = row
      .querySelector("td:nth-child(5)")
      .textContent.toLowerCase();

    if (
      manufacturer.includes(manufacturerFilterValue) &&
      status.includes(statusFilterValue) &&
      plateNumber.includes(plateNumberFilterValue)
    ) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// event listener for manufacturer filter input
manufacturerFilter.addEventListener(
  "input",
  debounce(filterRows, DEBOUNCE_DELAY)
);

// event listener for status filter input
statusFilter.addEventListener("input", debounce(filterRows, DEBOUNCE_DELAY));

// event listener for plate number filter input
plateNumberFilter.addEventListener(
  "input",
  debounce(filterRows, DEBOUNCE_DELAY)
);
