const {
  collection,
  doc,
  getDocs,
  addDoc,
  setDoc,
  getDoc,
} = require("firebase/firestore");

const { db } = require("../firebaseDB");
const warehouseCol = collection(db, "warehouse");

exports.getAllWarehouses = async (req, res) => {
  try {
    const warehouseSnapshot = await getDocs(warehouseCol);
    const warehouseList = warehouseSnapshot.docs.map((doc) => doc.data());

    return res.status(200).json({
      status: "success",
      results: warehouseList.length,
      data: warehouseList,
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error! Try again later",
    });
  }
};

exports.getWarehouse = async (req, res) => {
  try {
    const docRef = doc(db, "warehouse", req.params.warehouseId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists())
      return res.status(404).json({
        status: "error",
        message: "warehouse not found",
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

exports.createWarehouse = async (req, res) => {
  try {
    const newWarehouse = await addDoc(warehouseCol, req.body);

    return res.status(201).json({
      status: "success",
      message: "warehouse created successfully",
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error! Try again later",
    });
  }
};
