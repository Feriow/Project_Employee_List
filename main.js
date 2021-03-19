let employees = [];
let employeesChanged = [];
let roles = [];
let tableEl = document.getElementById("table");
let sortEl = document.getElementById("sort");
let filtersEl;
let fieldEl = document.getElementById("filter");
let tbodyEl = document.querySelector("tbody");
let employeeH2 = document.querySelector(".table>h2");

async function init() {
  [employees, roles] = await Promise.all([listEmployees(), listRoles()]);
  employeesChanged = employees;
  employeesChanged = sortList(+sortEl.value);
  renderData();
  renderRoles();
  filtersEl = document.querySelectorAll(".roles");
  addListeners();
}
init();

function renderData() {
  tbodyEl.innerHTML = "";
  employeeH2.textContent = `Employees (${employeesChanged.length})`;
  for (const employee of employeesChanged) {
    let role = roles.find((role) => role.id == employee.role_id);
    const tr = document.createElement("tr");

    const tdID = document.createElement("td");
    tdID.textContent = employee.id;
    tr.appendChild(tdID);

    const tdName = document.createElement("td");
    tdName.textContent = employee.name;
    tr.appendChild(tdName);

    const tdRole = document.createElement("td");
    tdRole.textContent = role.name;
    tr.appendChild(tdRole);

    const tdSalary = document.createElement("td");
    tdSalary.textContent = employee.salary;
    tr.appendChild(tdSalary);

    tbodyEl.appendChild(tr);
  }
}

function renderRoles() {
  for (const role of roles) {
    const label = document.createElement("label");
    const check = document.createElement("input");
    const name = document.createTextNode(role.name);
    const br = document.createElement("br");
    check.type = "checkbox";
    check.value = role.id;
    check.name = "roles";
    check.classList.add("roles");

    label.appendChild(check);
    label.appendChild(name);
    label.appendChild(br);
    fieldEl.appendChild(label);
  }
}

function addListeners() {
  sortEl.addEventListener("change", () => {
    employeesChanged = sortList(+sortEl.value);
    renderData();
  });

  for (const role of filtersEl) {
    role.addEventListener("change", () => {
      filterList();
    });
  }
}
let checkedRoles;

function filterList() {
  console.log("mudou");
  checkedRoles = document.querySelectorAll("#filter>label>input:checked");
  if (checkedRoles.length != 0) {
    let arrayB = [];
    let filteredEmp = [];

    for (let item of checkedRoles) {
      console.log(item);
      arrayB = employees.filter(function (emp) {
        return emp.role_id == +item.value;
      });
      filteredEmp = filteredEmp.concat(arrayB);
    }
    console.log(filteredEmp);
    employeesChanged = filteredEmp;
    sortList(+sortEl.value);
    renderData();
  } else {
    employeesChanged = employees;
    sortList(+sortEl.value);
    renderData();
  }
}

function sortList(x) {
  let sortedEmp = [];
  if (x == 0) {
    sortedEmp = employeesChanged.sort((emp1, emp2) => {
      if (emp1.name < emp2.name) {
        return -1;
      } else if (emp1.name > emp2.name) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (x == 1) {
    sortedEmp = employeesChanged.sort((emp1, emp2) => {
      if (emp1.name > emp2.name) {
        return -1;
      } else if (emp1.name < emp2.name) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (x == 2) {
    sortedEmp = employeesChanged.sort((emp1, emp2) => {
      if (emp1.salary < emp2.salary) {
        return -1;
      } else if (emp1.salary > emp2.salary) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (x == 3) {
    sortedEmp = employeesChanged.sort((emp1, emp2) => {
      if (emp1.salary > emp2.salary) {
        return -1;
      } else if (emp1.salary < emp2.salary) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  return sortedEmp;
}
