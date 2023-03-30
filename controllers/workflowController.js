const {
  collection,
  doc,
  getDocs,
  addDoc,
  setDoc,
  getDoc,
} = require("firebase/firestore");

const { db } = require("../firebaseDB");
const workflowCol = collection(db, "workflow");

exports.getAllWorkflows = async (req, res) => {
  try {
    const workflowSnapshot = await getDocs(workflowCol);
    const workflowList = workflowSnapshot.docs.map((doc) => doc.data());

    return res.status(200).json({
      status: "success",
      results: workflowList.length,
      data: workflowList,
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error! Try again later",
    });
  }
};

exports.getWorkflow = async (req, res) => {
  try {
    const docRef = doc(db, "workflow", req.params.warehouseId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists())
      return res.status(404).json({
        status: "error",
        message: "workflow not found",
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

exports.createWorkflow = async (req, res) => {
  try {
    const newWorkflow = await addDoc(workflowCol, req.body);

    return res.status(201).json({
      status: "success",
      message: "Workflow created successfully",
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error! Try again later",
    });
  }
};
