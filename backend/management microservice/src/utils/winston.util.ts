import { Logger,createLogger,format,transports } from "winston";
 
import winston = require("winston");

const {combine,timestamp,printf} = format
const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5
};
//new format
const newFormat = printf(({level,message,timestamp,...body})=>{
    // console.log(body)
  let log = `[${timestamp}][${body.key}][${body.logType}][${level}]:[payload= ${JSON.stringify(body.payload)}]`
  return log;
})


export let winstonLogger: Logger | undefined = undefined;

export const initWinston = () => {
  const logger = createLogger({

    format: combine(
        timestamp(),
        newFormat
    ),
    transports: [
        new transports.File({ filename: 'winston1.log' })
    ]
});
  winstonLogger = logger;
};