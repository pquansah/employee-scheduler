var moment = require('moment');

function transformEmployeeArray(employees, qualifications, employeeQualifications) {
  const employeeTransformer = { employees: {} };

  employees.forEach((employee) => {
    if(employeeTransformer.employees[employee.id]) {
      if(employeeTransformer.employees[employee.id].schedule[moment(employee.work_date).format('YYYY-MM-DD')]) {
        employeeTransformer.employees[employee.id].schedule[moment(employee.work_date).format('YYYY-MM-DD')].push({
          shift_start: employee.shift_start,
          shift_end: employee.shift_end,
          desciption: employee.description
        })
      } else {
        employeeTransformer.employees[employee.id].schedule[moment(employee.work_date).format('YYYY-MM-DD')] = [
          {
            shift_start: employee.shift_start,
            shift_end: employee.shift_end,
            desciption: employee.description
          }
        ]
      }
    } else {
      employeeTransformer.employees[employee.id] = {
        id: employee.id,
        fname: employee.fname,
        lname: employee.lname,
        schedule: {
          [moment(employee.work_date).format('YYYY-MM-DD')]: [
            {
              shift_start: employee.shift_start,
              shift_end: employee.shift_end,
              desciption: employee.description
            }
          ]
        }
      };
    }
  });

  employeeQualifications.forEach((empQual) => {
    const qualId = parseInt(empQual.qual_id);
    const empId = parseInt(empQual.employee_id);
    if(employeeTransformer.employees[empId] && employeeTransformer.employees[empId].qualifications) {
      employeeTransformer.employees[empId].qualifications.push({
        qual_id: qualId,
        label: qualifications[qualId]
      });
    }
    if (empQual.qual_id && employeeTransformer.employees[empId] && !employeeTransformer.employees[empId].qualifications) {
      employeeTransformer.employees[empId].qualifications = [{
        qual_id: qualId,
        label: qualifications[qualId]
      }];
    }
  });

  return employeeTransformer;
}

module.exports = transformEmployeeArray;
