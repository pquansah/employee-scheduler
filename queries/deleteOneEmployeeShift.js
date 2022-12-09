const deleteOneEmployeeShift = `
  update schedule
  set employee_id = null
  where employee_id = $1
  and work_date = $2
  and post_id = $3
`;

module.exports = deleteOneEmployeeShift;
