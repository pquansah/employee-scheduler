var express = require('express');
var emp = require('../../controllers/employee')
var router = express.Router();

router.get('/employees', emp.getAllEmployeeAvailability);
router.get('/employees/:id', emp.getEmployeeSchedule);
router.post('/employees/:id', emp.assignEmployeeShift)
router.delete('/employees/:id', emp.deleteEmployeeShift);

module.exports = router;