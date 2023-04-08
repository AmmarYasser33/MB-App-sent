const {
  collection,
  doc,
  getDocs,
  addDoc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} = require("firebase/firestore");

const { db } = require("../firebaseDB");
const carCol = collection(db, "cars");

exports.getAllCars = async (req, res) => {
  try {
    const carSnapshot = await getDocs(carCol);
    const carList = carSnapshot.docs.map((doc) => doc.data());

    return res.status(200).json({
      status: "success",
      results: carList.length,
      data: carList,
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error! Try again later",
    });
  }
};

exports.getCar = async (req, res) => {
  try {
    const docRef = doc(db, "cars", req.params.carId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists())
      return res.status(404).json({
        status: "error",
        message: "Car not found",
      });

    return res.status(200).json({
      status: "success",
      data: docSnap.data(),
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error! Try again later",
    });
  }
};

exports.createCar = async (req, res) => {
  try {
    // check if there is a duplicate car id => plate number + plate letters
    let duplicate = false;
    const carSnapshot = await getDocs(carCol);
    const carList = carSnapshot.docs.map((doc) => {
      if (
        doc.data().platenumber + doc.data().plateletter ===
        req.body.platenumber + req.body.plateletter
      )
        duplicate = true;

      return doc.data();
    });

    if (duplicate)
      return res.status(400).json({
        status: "error",
        message: "Car with this plate number and plate letters already exists",
      });

    await setDoc(
      doc(db, "cars", req.body.platenumber + req.body.plateletter),
      req.body
    );

    return res.status(201).json({
      status: "success",
      data: "Car created successfully",
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error! Try again later",
    });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const docRef = doc(db, "cars", req.params.carId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists())
      return res.status(404).json({
        status: "error",
        message: "Car not found",
      });

    await updateDoc(docRef, req.body);

    return res.status(200).json({
      status: "success",
      data: "Car updated successfully",
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error! Try again later",
    });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const docRef = doc(db, "cars", req.params.carId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists())
      return res.status(404).json({
        status: "error",
        message: "Car not found",
      });

    await deleteDoc(docRef);

    return res.status(200).json({
      status: "success",
      data: "Car deleted successfully",
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error! Try again later",
    });
  }
};
