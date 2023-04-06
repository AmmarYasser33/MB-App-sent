import { debounce } from "../utils.js";

// CONSTANTS
const DEBOUNCE_DELAY = 200;

// ELEMENTS
const nameFilter = document.getElementById("warehouseNameFilter");
const serialNumberFilter = document.getElementById("serialNumberFilter");
const statusFilter = document.getElementById("warehouseStatusFilter");

// function to filter rows based on all filters
function filterRows() {
  const nameFilterValue = nameFilter.value.toLowerCase();
  const serialNumberFilterValue = serialNumberFilter.value.toLowerCase();
  const statusFilterValue = statusFilter.value.toLowerCase();

  const rows = document.querySelectorAll(".warehouse-row");

  rows.forEach(function (row) {
    const name = row.querySelector("td:nth-child(2)").textContent.toLowerCase();
    const serialNumber = row
      .querySelector("td:nth-child(3)")
      .textContent.toLowerCase();
    const status = row
      .querySelector("td:nth-child(8)")
      .textContent.toLowerCase();

    if (
      name.includes(nameFilterValue) &&
      serialNumber.includes(serialNumberFilterValue) &&
      status.includes(statusFilterValue)
    ) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// event listener for name filter input
nameFilter.addEventListener("input", debounce(filterRows, DEBOUNCE_DELAY));

// event listener for serial number filter input
serialNumberFilter.addEventListener(
  "input",
  debounce(filterRows, DEBOUNCE_DELAY)
);

// event listener for status filter input
statusFilter.addEventListener("input", debounce(filterRows, DEBOUNCE_DELAY));
