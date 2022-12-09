var db = require('../../db');

function getEmployeeQualifications() {
  const data = db.any(`select * from employee_quals`);
  return data;
}

module.exports = getEmployeeQualifications;