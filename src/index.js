const app = require('./app');
const config = require('config');
const log = require('./helpers/logger');

// Catch all uncaught exception, log it and then die properly
process.on('uncaughtException', (err) => {
  log.error('UNCAUGHT_EXCEPTION', err);
  process.exit(1);
});

const start = async () => {
  app().listen(config.app.port, '0.0.0.0', (err) => {
    if (err) {
      return log.error('SERVER_STARTED_FAIL', err);
    }

    log.info('SERVER_STARTED_SUCCESS', config.app);
  });
};

start();
