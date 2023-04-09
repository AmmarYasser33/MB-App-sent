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
/*
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
*/
/*
exports.createWarehouse = async (req, res) => {
  try {
    // check if there is a duplicate warehouse serial number
    let duplicate = false;
    const warehouseSnapshot = await getDocs(warehouseCol);
    const warehouseList = warehouseSnapshot.docs.map((doc) => {
      if (doc.data().serialnumber === req.body.serialnumber) duplicate = true;

      return doc.data();
    });

    if (duplicate)
      return res.status(400).json({ status: "error", message: "Duplicate" });

    const newWarehouse = await setDoc(
      doc(db, "warehouse", req.body.serialnumber),
      req.body
    );

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
*/

exports.createWarehouse = async (req, res) => {
  try {
    let duplicate = false;
    const newId = generateId();

    const warehouseSnapshot = await getDocs(warehouseCol);
    warehouseSnapshot.docs.map((doc) => {
      if (doc.data().id === newId) duplicate = true;

      return doc.data();
    });

    if (duplicate)
      return res
        .status(400)
        .json({ status: "error", message: "Duplicate id! Try again." });

    req.body.id = newId;

    const newWarehouse = await setDoc(doc(db, "warehouse", newId), req.body);

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

exports.updateWarehouse = async (req, res) => {
  try {
    const docRef = doc(db, "warehouse", req.params.warehouseId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists())
      return res.status(404).json({
        status: "error",
        message: "warehouse not found",
      });

    await updateDoc(docRef, req.body);

    return res.status(200).json({
      status: "success",
      message: "warehouse updated successfully",
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error! Try again later",
    });
  }
};

// get warehouse by serial number
// loop through warehouse list and find the one with the serial number and return it
exports.getWarehouseBySerialNumber = async (req, res) => {
  try {
    const warehouseSnapshot = await getDocs(warehouseCol);
    const warehouseList = warehouseSnapshot.docs.map((doc) => doc.data());

    const warehouse = warehouseList.find(
      (warehouse) => warehouse.serialnumber === req.params.serialnumber
    );

    if (!warehouse)
      return res.status(404).json({
        status: "error",
        message: "warehouse not found",
      });

    return res.status(200).json({
      status: "success",
      data: warehouse,
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error! Try again later",
    });
  }
};

// update warehouse by serial number
exports.updateWarehouseBySerialNumber = async (req, res) => {
  try {
    const warehouseSnapshot = await getDocs(warehouseCol);
    const warehouseList = warehouseSnapshot.docs.map((doc) => doc.data());

    const warehouse = warehouseList.find(
      (warehouse) => warehouse.serialnumber === req.params.serialnumber
    );

    if (!warehouse)
      return res.status(404).json({
        status: "error",
        message: "warehouse not found",
      });

    const docRef = doc(db, "warehouse", req.params.serialnumber);
    await updateDoc(docRef, req.body);

    return res.status(200).json({
      status: "success",
      message: "warehouse updated successfully",
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error! Try again later",
    });
  }
};

exports.deleteWarehouse = async (req, res) => {
  try {
    const docRef = doc(db, "warehouse", req.params.serialnumber);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await deleteDoc(docRef);

      return res.status(200).json({
        status: "success",
        message: "Warehouse deleted successfully",
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "Warehouse not found",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error! Try again later",
    });
  }
};

exports.updateWarehouseById = async (req, res) => {
  try {
    const docRef = doc(db, "warehouse", req.params.warehouseId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists())
      return res.status(404).json({
        status: "error",
        message: "Warehouse not found",
      });

    await updateDoc(docRef, req.body);

    return res.status(200).json({
      status: "success",
      data: "Warehouse updated successfully",
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error! Try again later",
    });
  }
};

exports.deleteWarehouseById = async (req, res) => {
  try {
    const docRef = doc(db, "warehouse", req.params.warehouseId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await deleteDoc(docRef);

      return res.status(200).json({
        status: "success",
        message: "Warehouse deleted successfully",
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "Warehouse not found",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error! Try again later",
    });
  }
};

// function to generate a random id (length = 18)
function generateId() {
  let id = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 18; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return id;
}
