var express = require('express');
const basicAuth = require('express-basic-auth');
var router = express.Router();

var emp = require('./employee');
var shiftAvail = require('./shiftAvailability');

router.use(basicAuth({
  authorizer: (username, password) => {
    const userMatches = basicAuth.safeCompare(username, 'test');
    const passwordMatches = basicAuth.safeCompare(password, 'test');
    return userMatches & passwordMatches;
  },
  unauthorizedResponse: (req) => {
    return `unauthorized.`
  }
}))

router.use('/calendar', emp, shiftAvail);

module.exports = router;