const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", authController.isLoggedIn, viewController.getLoginPage);
router.get("/login", authController.isLoggedIn, viewController.getLoginPage);

router.use(authController.protect);

router.get(
  "/team",
  authController.restrictTo("team-leader", "assistant"),
  viewController.getTeamPage
);
router.get("/cars", viewController.getCarsPage);
router.get("/warehouse", viewController.getWarehousePage);
router.get("/workflow", viewController.getWorkflowPage);

module.exports = router;
