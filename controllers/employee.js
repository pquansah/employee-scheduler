var db = require('../db');
var { getEmployeeSchedules, getOneEmployeeSchedule, deleteOneEmployeeShift, updateOpenShift } = require('../queries');
const { getEmployeeQualifications, getQualifications, transformEmployeeArray, isShiftAvailable, isUnderTotalHours, isQualified } = require('./utils');

async function getAllEmployeeAvailability(req, res, next) {
  try {
    const [employees, employeeQualifications, qualifications] = await Promise.all([
      db.any(getEmployeeSchedules),
      getEmployeeQualifications(),
      getQualifications()
    ]);

    if(Array.isArray(employees) && !employees.length) {
      return res.status(400).send('no employee id found');
    }

    const data = transformEmployeeArray(employees, qualifications, employeeQualifications);
    return res.status(200).json({ status: 'success', data });
  } catch (err) {
    console.log(err)
    return next(err);
  }
}

async function getEmployeeSchedule(req, res, next) {
  try {
    const id = parseInt(req.params.id)
    const [employees, employeeQualifications, qualifications] = await Promise.all([
      db.any(getOneEmployeeSchedule, id),
      getEmployeeQualifications(),
      getQualifications()
    ]);

    if(Array.isArray(employees) && !employees.length) {
      return res.status(400).send('no employee id found');
    }

    const data = transformEmployeeArray(employees, qualifications, employeeQualifications);
    return res.status(200).json({ status: 'success', data });
  } catch (err) {
    console.log(err)
    return next(err);
  }
}

async function deleteEmployeeShift(req, res, next) {
  try {
    const id = parseInt(req.params.id)
    const postId = parseInt(req.body.postId)
    const data = await db.any(deleteOneEmployeeShift, [id, req.body.date, postId]);
    return res.status(200).json({ status: 'successfully deleted', data });
  } catch (err) {
    console.log(err)
    return next(err);
  }
}

async function assignEmployeeShift(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const postId = parseInt(req.body.postId);
    const date = req.body.date;
    let data = [];
    if(!id || !postId || !date) {
      return res.status(400).send('either employee id, postId, or date is missing');
    }

    const shiftAvailable = await isShiftAvailable(postId, date);
    if(!shiftAvailable) {
      return res.status(400).send('shift is unavailable or taken');
    }

    const underTotalHours = await isUnderTotalHours(id, date, postId);
    if(!underTotalHours) {
      return res.status(400).send('the amount of hours exceeds the total limit');
    }

    const isEmployeeQualified = await isQualified(id, postId);
    if(!isEmployeeQualified) {
      return res.status(400).send('employee does not have the right qualifications');
    }

    if(shiftAvailable && underTotalHours && isEmployeeQualified) {
      data = await db.any(updateOpenShift, [id, date, postId]);
    }
    return res.status(200).json({ status: 'successfully deleted', data });
  } catch (err) {
    console.log(err)
    return next(err);
  }
}

module.exports = {
  getAllEmployeeAvailability,
  getEmployeeSchedule,
  deleteEmployeeShift,
  assignEmployeeShift
}