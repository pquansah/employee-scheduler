var express = require('express');
var healthcheck = require('./healthcheck')
var router = express.Router();

router.use('/healthcheck', healthcheck);

module.exports = router;