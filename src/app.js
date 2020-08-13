const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const log = require('./helpers/logger');
const _ = require('lodash');
const Kosa = require('@webinmove/kosa');
const healthcheckRouter = require('./controllers/healthcheck');

module.exports = () => {
  log.debug('API_LOADING');

  // Express configuration
  const app = express();
  app.enable('trust proxy');
  app.use(express.json({ strict: true, limit: '10mb' }));
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: false }));
  app.use(helmet());
  app.use(
    cors({
      origin: '*',
      methods: 'GET,POST,PUT,OPTION',
      allowedHeaders: 'Accept, Content-type, Authorization, X-Requested-With',
      credentials: true,
      preflightContinue: false
    })
  );

  // Routes
  app.get('/', async (_req, res, _next) => {
    return res.status(200).json({ service: 'skeleton-js-express' });
  });
  app.use('/healthcheck', healthcheckRouter);

  // Default catch all => 404 NOT FOUND
  app.all('*', (req, res, next) => {
    next(new Kosa('API_GENERAL', 404));
  });

  // Global Error handler
  app.use((error, req, res, _next) => {
    const statusCode = error.statusCode || 500;
    const data = {
      error: error.message
    };

    if (error.validations) {
      data.validations = error.validations;
    }

    const meta = _.pick(req, ['method', 'path', 'query', 'body']);

    log.error('API_FAIL', error, meta);
    res.status(statusCode).json(data);
  });

  return app;
};
