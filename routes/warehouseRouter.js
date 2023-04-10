const express = require("express");
const warehouseController = require("../controllers/warehouseController");

const router = express.Router();

router
  .route("/")
  .get(warehouseController.getAllWarehouses)
  .post(warehouseController.createWarehouse);

router
  .route("/:warehouseId")
  .get(warehouseController.getWarehouse)
  .patch(warehouseController.updateWarehouseById)
  .delete(warehouseController.deleteWarehouseById);

module.exports = router;
