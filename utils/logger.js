const winston = require("winston");
const path = require("path");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.label({ label: "WeatherWatcher" }),
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/error.log"),
      level: "error"
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/combined.log")
    })
  ]
});

module.exports = { logger };
