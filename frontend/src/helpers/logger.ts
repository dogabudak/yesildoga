import pino from 'pino';

const LOGGER_LEVEL = process.env.LOG_LEVEL || 'info';
const isDev = process.env.NODE_ENV === 'development';

const Logger = pino({
  level: LOGGER_LEVEL,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      singleLine: true,
      ignore: 'pid,hostname',
    },
  },
});

// eslint-disable-next-line import/no-default-export
export default Logger;
