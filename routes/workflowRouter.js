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

module.exports = router;
