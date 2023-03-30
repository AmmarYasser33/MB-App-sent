const { db } = require("../firebaseDB");
const { getDocs, collection } = require("firebase/firestore");

exports.getTeamPage = async (req, res) => {
  const employeesCol = collection(db, "employees");
  let opNum = 0;
  let ptsExpiredNum = 0;

  const teamSnapshot = await getDocs(employeesCol);
  const employeesList = teamSnapshot.docs.map((doc) => {
    if (doc.data().po === "Active") {
      opNum++;
    }
    if (doc.data().pts === "Expired") {
      ptsExpiredNum++;
    }
    return doc.data();
  });

  res.status(200).render("team", {
    results: employeesList.length,
    opNum,
    ptsExpiredNum,
    data: employeesList,
  });
};

exports.getCarsPage = async (req, res) => {
  const carCol = collection(db, "cars");
  let fuelNum = 0;
  let spareTireNum = 0;
  let needMaintenanceNum = 0;

  const carSnapshot = await getDocs(carCol);
  const carList = carSnapshot.docs.map((doc) => {
    if (doc.data().status === "Fuel") {
      fuelNum++;
    }
    if (doc.data().status === "Spare Tire") {
      spareTireNum++;
    }
    if (doc.data().status === "Need Maintenance") {
      needMaintenanceNum++;
    }
    return doc.data();
  });

  res.status(200).render("cars", {
    results: carList.length,
    fuelNum,
    spareTireNum,
    needMaintenanceNum,
    data: carList,
  });
};

exports.getWarehousePage = async (req, res) => {
  const warehouseCol = collection(db, "warehouse");

  const warehouseSnapshot = await getDocs(warehouseCol);
  const warehouseList = warehouseSnapshot.docs.map((doc) => doc.data());

  res.status(200).render("warehouse", {
    results: warehouseList.length,
    data: warehouseList,
  });
};

exports.getWorkflowPage = async (req, res) => {
  const workflowCol = collection(db, "workflow");
  const employeesCol = collection(db, "employees");
  const carsCol = collection(db, "cars");

  const workflowSnapshot = await getDocs(workflowCol);
  const workflowList = workflowSnapshot.docs.map((doc) => doc.data());

  const teamSnapshot = await getDocs(employeesCol);
  const employeesList = teamSnapshot.docs.map((doc) => doc.data());

  const carsSnapshot = await getDocs(carsCol);
  const carsList = carsSnapshot.docs.map((doc) => doc.data());

  res.status(200).render("workflow", {
    results: workflowList.length,
    data: workflowList,
    employeesList,
    carsList,
  });
};

exports.getLoginPage = (req, res) => {
  if (res.locals.loggedUser) {
    return res.redirect("/index");
  }

  res.status(200).render("loginUser");
};
