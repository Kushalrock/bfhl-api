const fs = require("fs");
const path = require("path");
const winston = require("winston");
require("winston-daily-rotate-file");

const logDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const { combine, timestamp, printf, colorize, json } = winston.format;

const consoleFormat = combine(
  colorize(),
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  printf(({ timestamp, level, message, ...meta }) => {
    const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
    return `${timestamp} ${level}: ${message}${metaStr}`;
  })
);

const fileJsonFormat = combine(timestamp(), json());

const accessRotate = new winston.transports.DailyRotateFile({
  filename: path.join(logDir, "access-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  level: "info",
  maxSize: "20m",
  maxFiles: "14d",
  format: fileJsonFormat,
});

const errorRotate = new winston.transports.DailyRotateFile({
  filename: path.join(logDir, "error-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  level: "error",
  maxSize: "20m",
  maxFiles: "30d",
  format: fileJsonFormat,
});

const consoleLogger = winston.createLogger({
  level: process.env.LOG_LEVEL || "debug",
  transports: [new winston.transports.Console({ format: consoleFormat })],
});

const accessLogger = winston.createLogger({
  level: "info",
  transports: [accessRotate],
});

const errorLogger = winston.createLogger({
  level: "error",
  transports: [errorRotate],
});

module.exports = {
  consoleLogger,
  accessLogger,
  errorLogger,
};
