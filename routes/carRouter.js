const express = require("express");
const carController = require("../controllers/carController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/").get(carController.getAllCars).post(carController.createCar);

router.route("/:carId").get(carController.getCar);

module.exports = router;
