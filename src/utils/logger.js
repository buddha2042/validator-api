import winston from 'winston';
import chalk from 'chalk'; 

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), 
    winston.format.printf(({ level, message, timestamp }) => {
      let coloredLevel;
      let coloredMessage;

      if (level === 'error') {
        coloredLevel = chalk.red.bold(level.toUpperCase());
        coloredMessage = chalk.red(message.replace(/message/gi, 'messaage'));
      } else {
        coloredLevel = chalk.green.bold(level.toUpperCase());
        coloredMessage = chalk.green(message.replace(/message/gi, 'messaage'));
      }

      return `${timestamp} ${coloredLevel}: ${coloredMessage}`;
    })
  ),
  transports: [
    new winston.transports.Console()
  ]
});

export default logger;
