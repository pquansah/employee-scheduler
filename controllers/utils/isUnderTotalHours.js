var db = require('../../db');
var { getOneEmployeeSchedule, shiftAvailability } = require('../../queries');
const getEmployeeQualifications = require('./getEmployeeQualifications');
const getQualifications = require('./getQualifications');
const transformEmployeeArray = require('./transformEmployeeArray');
var moment = require('moment');

const MAX_HOURS = 40;

async function isUnderTotalHours(empId, date, postId) {
  let totalWeeklyHours = 0;
  let totalDailyHours = 0;
  const [employees, employeeQualifications, qualifications] = await Promise.all([
    db.any(getOneEmployeeSchedule, empId),
    getEmployeeQualifications(),
    getQualifications()
  ]);

  const availableShift = await db.any(shiftAvailability, [postId, date]);

  if(Array.isArray(employees) && !employees.length) {
    return false;
  }

  const data = transformEmployeeArray(employees, qualifications, employeeQualifications);
  const schedule = data.employees[empId].schedule

  const dateFormatted = moment(date, 'YYYY-MM-DD');
  const fromDate = dateFormatted.startOf('week').toDate();
  const toDate = dateFormatted.endOf('week').toDate();

  for(var item in schedule) {
    schedule[item].forEach((shift) => {
      const formattedInputDate = moment(date, 'YYYY-MM-DD');
      if(formattedInputDate.isBetween(fromDate, toDate, "day")) {
        const start = moment(shift.shift_start, 'HH:mm:ss a');
        const end = moment(shift.shift_end, 'HH:mm:ss a');

        const hours = moment.duration(end.diff(start)).asHours();
        if(start.isAfter(end)) {
          totalWeeklyHours = totalWeeklyHours + (24 + hours);
        } else {
          totalWeeklyHours += hours
        }
      }
    })
  }

  for(var element of schedule[item]) {
    const start = moment(element.shift_start, 'HH:mm:ss a');
    const end = moment(element.shift_end, 'HH:mm:ss a');

    const hours = moment.duration(end.diff(start)).asHours();
    if(start.isAfter(end)) {
      totalDailyHours = totalDailyHours + (24 + hours);
    } else {
      totalDailyHours += hours
    }
  }

  const fecthedShift = availableShift[0];

  const fecthedShiftStart = moment(fecthedShift.shift_start, 'HH:mm:ss a');
  const fecthedShiftEnd = moment(fecthedShift.shift_end, 'HH:mm:ss a');

  const fecthedShiftHours = moment.duration(fecthedShiftEnd.diff(fecthedShiftStart)).asHours();
  if(fecthedShiftStart.isAfter(fecthedShiftEnd)) {
    totalDailyHours = totalDailyHours + (24 + fecthedShiftHours);
  } else {
    totalDailyHours += fecthedShiftHours;
  }

  if(totalWeeklyHours >= MAX_HOURS || totalDailyHours > 8) {
    return false;
  }

  return true;
}

module.exports = isUnderTotalHours;