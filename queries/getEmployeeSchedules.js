const getEmployeeSchedules = `
  select
    e.id,
    e.fname,
    e.lname,
    s.work_date,
    p.description,
    p.shift_start,
    p.shift_end
  from employee e
  inner join
    schedule s
    on e.id = s.employee_id
  inner join
    posts p
    on s.post_id = p.id
`;

module.exports = getEmployeeSchedules;
