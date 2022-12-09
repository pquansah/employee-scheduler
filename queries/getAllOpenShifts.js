const getAllOpenShifts = `
  select
    s.work_date,
    p.description,
    p.shift_start,
    p.shift_end
  from schedule s
  inner join
    posts p
    on s.post_id = p.id
  where s.employee_id is null
`;

module.exports = getAllOpenShifts;
