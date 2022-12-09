const updateOpenShift = `
  update schedule
  set employee_id = $1
  where work_date = $2
  and post_id = $3
`;

module.exports = updateOpenShift;
