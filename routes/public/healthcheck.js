var express = require('express');

var router = express.Router({});
router.get('/', async (_req, res, _next) => {
	const healthcheck = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now()
	};
	try {
		res.send(healthcheck);
	} catch (e) {
		healthcheck.message = e;
		res.status(502).send();
	}
});
module.exports = router;