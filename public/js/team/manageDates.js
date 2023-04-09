getTeam()
  .then((team) => {
    team.forEach((emp) => {
      if (
        isDateExpired(emp.poExpiringDate) ||
        isDateExpired(emp.ptsExpiringDate)
      ) {
        updateEmployeeDates(
          emp,
          isDateExpired(emp.poExpiringDate),
          isDateExpired(emp.ptsExpiringDate)
        );
      }
    });
  })
  .catch((error) => {
    console.log("error");
  });

async function getTeam() {
  try {
    const response = await fetch("/api/team");
    const data = await response.json();
    return data.data;
  } catch (error) {
    return;
  }
}

function isDateExpired(dateStr) {
  const date = new Date(dateStr);

  const today = new Date();

  return date <= today;
}

function updateEmployeeDates(Employee, isPOExpired, isPTExpired) {
  isPOExpired ? (Employee.po = "Expired") : (Employee.po = "Active");
  isPTExpired ? (Employee.pts = "Expired") : (Employee.pts = "Active");

  axios.patch(`/api/team/${Employee.sarid}`, Employee);
}
