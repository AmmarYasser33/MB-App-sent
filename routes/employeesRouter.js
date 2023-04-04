const express = require("express");
const employeesController = require("../controllers/employeesController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(employeesController.getAllEmployees)
  .post(employeesController.createEmployee);

router
  .route("/:sarid")
  .get(employeesController.getEmployee)
  .patch(employeesController.updateEmployee);

router.route("/login").post(authController.login);
router.route("/auth/logout").get(authController.logout);

module.exports = router;
