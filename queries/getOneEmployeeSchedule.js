const getOneEmployeeSchedule = `
  select
    e.id,
    e.fname,
    e.lname,
    s.work_date,
    p.description,
    p.shift_start,
    p.shift_end
  from employee e
  left join
    schedule s
    on e.id = s.employee_id
  left join
    posts p
    on s.post_id = p.id
  where e.id = $1
`;

module.exports = getOneEmployeeSchedule;
