// prettier-ignore
const {collection, doc, getDocs, addDoc, setDoc, updateDoc, deleteDoc, getDoc}
  = require("firebase/firestore");
const isEmail = require("validator/lib/isEmail");

const { db } = require("../firebaseDB");
const employeesCol = collection(db, "employees");

exports.getAllEmployees = async (req, res) => {
  try {
    const teamSnapshot = await getDocs(employeesCol);
    const employeesList = teamSnapshot.docs.map((doc) => doc.data());

    return res.status(200).json({
      status: "success",
      results: employeesList.length,
      data: employeesList,
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error! Try again later",
    });
  }
};

exports.getEmployee = async (req, res) => {
  try {
    const docRef = doc(db, "employees", req.params.sarid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists())
      return res.status(404).json({
        status: "error",
        message: "Employee not found",
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

exports.createEmployee = async (req, res) => {
  try {
    // check if there is a duplicate employee sarid number
    let duplicate = false;
    const teamSnapshot = await getDocs(employeesCol);
    const employeesList = teamSnapshot.docs.map((doc) => {
      if (doc.data().sarid === req.body.sarid) duplicate = true;

      return doc.data();
    });

    if (duplicate)
      return res.status(400).json({
        status: "error",
        message: "Duplicate Employee SAR ID",
      });

    if (!isEmail(req.body.email)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid Email",
      });
    }

    // await addDoc(employeesCol, req.body);
    await setDoc(doc(db, "employees", req.body.sarid), req.body);

    return res.status(201).json({
      status: "success",
      message: "Employee added successfully",
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error! Try again later",
    });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const docRef = doc(db, "employees", req.params.sarid);
    const docSnap = await getDoc(docRef);

    if (!isEmail(req.body.email)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid Email",
      });
    }

    if (docSnap.exists()) {
      await updateDoc(docRef, req.body);

      return res.status(200).json({
        status: "success",
        message: "Employee updated successfully",
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "Employee not found",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error! Try again later",
    });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const docRef = doc(db, "employees", req.params.sarid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await deleteDoc(docRef);

      return res.status(200).json({
        status: "success",
        message: "Employee deleted successfully",
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "Employee not found",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error! Try again later",
    });
  }
};
