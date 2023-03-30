const express = require("express");
const workflowController = require("../controllers/workflowController");

const router = express.Router();

router
  .route("/")
  .get(workflowController.getAllWorkflows)
  .post(workflowController.createWorkflow);

router.route("/:warehouseId").get(workflowController.getWorkflow);

module.exports = router;
