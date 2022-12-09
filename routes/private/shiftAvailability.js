var express = require('express');
var shiftAvail = require('../../controllers/shiftAvailability')
var router = express.Router();

router.get('/shiftAvailability', shiftAvail.getAllAvailableShifts);

module.exports = router;