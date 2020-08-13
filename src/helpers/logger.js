const config = require('config');
const packageInfo = require('../../package.json');
const winston = require('winston');
const os = require('os');

const logFormat = winston.format.combine(
  winston.format.json(),
  winston.format.timestamp(),
  winston.format.metadata()
);

// const prettyFormat = winston.format.combine(
//   winston.format.simple(),
//   winston.format.colorize(),
//   winston.format.timestamp(),
//   winston.format.metadata(),
//   winston.format.prettyPrint()
// );

module.exports = winston.createLogger({
  level: config.app.logLevel,
  format: logFormat,
  defaultMeta: {
    hostname: os.hostname(),
    pid: process.pid,
    version: packageInfo.version,
    projectName: packageInfo.name,
    buildNumber: config.app.buildNumber
  },
  transports: [new winston.transports.Console({ format: logFormat })]
});
