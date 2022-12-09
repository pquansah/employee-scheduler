var db = require('../db');
var { getAllOpenShifts } = require('../queries');
var moment = require('moment');

async function getAllAvailableShifts(req, res, next) {
  try {
    const data = await db.map(getAllOpenShifts, null, (shift) => {
      return {
        work_date: moment(shift.work_date).format('YYYY-MM-DD'),
        shift_start: shift.shift_start,
        shift_end: shift.shift_end,
        description: shift.description
      }
    });
    return res.status(200).json({ status: 'success', data });
  } catch (err) {
    console.log(err)
    return next(err);
  }
}

module.exports = {
  getAllAvailableShifts
}