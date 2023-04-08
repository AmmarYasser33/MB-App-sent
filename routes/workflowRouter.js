const express = require("express");
const workflowController = require("../controllers/workflowController");

const router = express.Router();

router
  .route("/")
  .get(workflowController.getAllWorkflows)
  .post(workflowController.createWorkflow);

router
  .route("/:workOrder")
  .get(workflowController.getWorkflowByWorkOrder)
  .patch(workflowController.updateWorkflow)
  .delete(workflowController.deleteWorkflow);

module.exports = router;
