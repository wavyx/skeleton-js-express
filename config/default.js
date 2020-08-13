module.exports = {
  app: {
    name: process.env.APP_NAME || 'api',
    port: process.env.APP_PORT || 3000,
    buildNumber: process.env.BUILD_NUMBER_CI || 'local',
    logLevel: process.env.LOG_LEVEL || 'debug',
    env: process.env.NODE_ENV || 'development'
  }
};
