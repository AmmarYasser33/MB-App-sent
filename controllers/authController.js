const { collection, doc, getDoc } = require("firebase/firestore");

const { db } = require("../firebaseDB");
const employeesCol = collection(db, "employees");

exports.login = async (req, res, next) => {
  const sarid = req.body.sarid;

  const docRef = doc(db, "team", sarid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists())
    return res.status(404).json({
      status: "error",
      message: "Invalid SAR ID",
    });

  const cookieOptions = {
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  const loggedUser = docSnap.data();

  res.cookie("loggedUser", loggedUser);

  res.status(200).json({
    status: "success",
    data: docSnap.data(),
  });
};

exports.protect = async (req, res, next) => {
  if (req.cookies.loggedUser) {
    try {
      const user = req.cookies.loggedUser;

      res.locals.loggedUser = user;
      req.loggedUser = user;

      return next();
    } catch (e) {
      return res.status(401).json({
        status: "error",
        message: "Error in Logged In",
      });
    }
  }

  res.status(401).json({
    status: "error",
    message: "You are not logged in! Please log in to get access",
  });
};

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.loggedUser) {
    try {
      res.locals.loggedUser = req.cookies.loggedUser;
    } catch (e) {}
  }

  next();
};

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.loggedUser.role)) {
      return res.status(403).json({
        status: "error",
        message: "You do not have permission to perform this action",
      });
    }

    next();
  };

exports.returnDBKey = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: process.env.FIREBASE_API_KEY,
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Error in returning API Key",
    });
  }
};