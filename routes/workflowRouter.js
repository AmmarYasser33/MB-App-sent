const express = require("express");
const workflowController = require("../controllers/workflowController");

const router = express.Router();

router
  .route("/")
  .get(workflowController.getAllWorkflows)
  .post(workflowController.createWorkflow);

router
  .route("/:workflowId")
  .get(workflowController.getWorkflow)
  .patch(workflowController.updateWorkflowById)
  .delete(workflowController.deleteWorkflowById);

/*
router
  .route("/:workOrder")
  .get(workflowController.getWorkflowByWorkOrder)
  .patch(workflowController.updateWorkflowByWorkOrder)
  .delete(workflowController.deleteWorkflow);
*/

module.exports = router;
