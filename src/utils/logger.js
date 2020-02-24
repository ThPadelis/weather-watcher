const app_root = require("app-root-path");
const winston = require("winston");

const customFormat = winston.format.printf(
  info => `${info.timestamp} ${info.level}: ${info.message}`
);

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.splat(),
    customFormat
  ),
  transports: [
    new winston.transports.File({
      filename: `${app_root}/src/logs/error.log`,
      level: "error"
    }),
    new winston.transports.File({
      filename: `${app_root}/src/logs/combine.log`,
      level: "info"
    })
  ]
});

module.exports = { logger };
