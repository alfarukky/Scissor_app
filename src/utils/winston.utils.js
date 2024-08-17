const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logfile.log' }),
    new winston.transports.File({
      filename: 'uncaughtExceptions.log',
      handleExceptions: true,
    }),
  ],
});

process.on('unhandledRejection', (ex) => {
  throw ex;
});

module.exports = logger;
