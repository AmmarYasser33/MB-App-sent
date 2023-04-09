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
    const docRef = doc(db, "workflow", req.params.workflowId);
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
      // message: "Internal Server Error! Try again later",
      message: e.message,
    });
  }
};
/*
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
*/

/*
exports.createWorkflow = async (req, res) => {
  try {
    // check if there is a duplicate workorder
    let duplicate = false;
    const workflowSnapshot = await getDocs(workflowCol);
    const workflowList = workflowSnapshot.docs.map((doc) => {
      if (doc.data().workorder === req.body.workorder) duplicate = true;

      return doc.data();
    });

    if (duplicate)
      return res
        .status(400)
        .json({ status: "error", message: "Duplicate work order" });

    const newWorkflow = await setDoc(
      doc(db, "workflow", req.body.workorder),
      req.body
    );

    return res.status(201).json({
      status: "success",
      message: "workflow created successfully",
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error! Try again later",
    });
  }
};
*/

// create workflow and set id as random string (length = 15)
exports.createWorkflow = async (req, res) => {
  try {
    // check if there is a duplicate id
    let duplicate = false;
    const newId = generateId();

    const workflowSnapshot = await getDocs(workflowCol);
    workflowSnapshot.docs.map((doc) => {
      if (doc.data().id === newId) duplicate = true;

      return doc.data();
    });

    if (duplicate)
      return res
        .status(400)
        .json({ status: "error", message: "Duplicate id! Try again." });

    req.body.id = newId;

    const newWorkflow = await setDoc(doc(db, "workflow", newId), req.body);

    return res.status(201).json({
      status: "success",
      message: "workflow created successfully",
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error! Try again later",
    });
  }
};

// get workflow by workorder
exports.getWorkflowByWorkOrder = async (req, res) => {
  try {
    const docRef = doc(db, "workflow", req.params.workOrder);
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

exports.updateWorkflowByWorkOrder = async (req, res) => {
  try {
    const docRef = doc(db, "workflow", req.params.workOrder);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists())
      return res.status(404).json({
        status: "error",
        message: "Workflow not found",
      });

    await updateDoc(docRef, req.body);

    return res.status(200).json({
      status: "success",
      data: "Workflow updated successfully",
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error! Try again later",
    });
  }
};

exports.deleteWorkflow = async (req, res) => {
  try {
    const docRef = doc(db, "workflow", req.params.workOrder);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists())
      return res.status(404).json({
        status: "error",
        message: "Workflow not found",
      });

    await deleteDoc(docRef);

    return res.status(200).json({
      status: "success",
      data: "Workflow deleted successfully",
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error! Try again later",
    });
  }
};

exports.updateWorkflowById = async (req, res) => {
  try {
    const docRef = doc(db, "workflow", req.params.workflowId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists())
      return res.status(404).json({
        status: "error",
        message: "Workflow not found",
      });

    await updateDoc(docRef, req.body);

    return res.status(200).json({
      status: "success",
      data: "Workflow updated successfully",
    });
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error! Try again later",
    });
  }
};

exports.deleteWorkflowById = async (req, res) => {
  try {
    const docRef = doc(db, "workflow", req.params.workflowId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists())
      return res.status(404).json({
        status: "error",
        message: "Workflow not found",
      });

    await deleteDoc(docRef);

    return res.status(200).json({
      status: "success",
      data: "Workflow deleted successfully",
    });
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
