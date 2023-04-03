const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const employeesRouter = require("./routes/employeesRouter");
const carRouter = require("./routes/carRouter");
const warehouseRouter = require("./routes/warehouseRouter");
const workflowRouter = require("./routes/workflowRouter");
const viewRouter = require("./routes/viewRouter");
const authController = require("./controllers/authController");

const app = express();
dotenv.config({ path: "./config.env" });

app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// ROUTES
app.use("/api/team", employeesRouter);
app.use("/api/cars", carRouter);
app.use("/api/warehouse", warehouseRouter);
app.use("/api/workflow", workflowRouter);
app.use("/", viewRouter);

app.get("/index", (req, res) => {
  res.status(200).render("index");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
