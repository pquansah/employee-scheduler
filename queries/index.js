var getEmployeeSchedules = require('./getEmployeeSchedules');
var getOneEmployeeSchedule = require('./getOneEmployeeSchedule');
var deleteOneEmployeeShift = require('./deleteOneEmployeeShift');
var getAllOpenShifts = require('./getAllOpenShifts');
var shiftAvailability = require('./shiftAvailability');
var updateOpenShift = require('./updateOpenShift');

module.exports = {
  getEmployeeSchedules,
  getOneEmployeeSchedule,
  deleteOneEmployeeShift,
  shiftAvailability,
  getAllOpenShifts,
  updateOpenShift
};
