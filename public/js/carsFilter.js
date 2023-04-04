import { debounce } from "./utils.js";

const manufacturerFilter = document.getElementById("manufacturerFilter");
const statusFilter = document.getElementById("statusFilter");
const plateNumberFilter = document.getElementById("plateNumberFilter");
const DEBOUNCE_DELAY = 200;

manufacturerFilter.addEventListener(
  "input",
  debounce(function (event) {
    const filterValue = event.target.value.toLowerCase();
    const rows = document.querySelectorAll(".car-row");

    rows.forEach(function (row) {
      const manufacturer = row
        .querySelector("td:nth-child(1)")
        .textContent.toLowerCase();

      if (manufacturer.includes(filterValue)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }, DEBOUNCE_DELAY)
);

statusFilter.addEventListener(
  "input",
  debounce(function (event) {
    const filterValue = event.target.value.toLowerCase();
    const rows = document.querySelectorAll(".car-row");

    rows.forEach(function (row) {
      const manufacturer = row
        .querySelector("td:nth-child(6)")
        .textContent.toLowerCase();

      if (manufacturer.includes(filterValue)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }, DEBOUNCE_DELAY)
);

plateNumberFilter.addEventListener(
  "input",
  debounce(function (event) {
    const filterValue = event.target.value.toLowerCase();
    const rows = document.querySelectorAll(".car-row");

    rows.forEach(function (row) {
      const manufacturer = row
        .querySelector("td:nth-child(5)")
        .textContent.toLowerCase();

      if (manufacturer.includes(filterValue)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }, DEBOUNCE_DELAY)
);
