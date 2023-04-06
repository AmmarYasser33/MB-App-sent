const express = require("express");
const warehouseController = require("../controllers/warehouseController");

const router = express.Router();

router
  .route("/")
  .get(warehouseController.getAllWarehouses)
  .post(warehouseController.createWarehouse);

router
  .route("/:serialnumber")
  .get(warehouseController.getWarehouseBySerialNumber)
  .patch(warehouseController.updateWarehouseBySerialNumber);

module.exports = router;
