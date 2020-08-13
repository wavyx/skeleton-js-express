const packageJson = require('../../package.json');
const router = require('express').Router();
const config = require('config');

router.get('/', async (_req, res, _next) => {
  return res.json({
    status: 'UP',
    name: packageJson.name,
    version: packageJson.version,
    buildNumber: config.app.buildNumber
  });
});

module.exports = router;
