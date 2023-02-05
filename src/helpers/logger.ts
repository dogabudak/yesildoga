import pino from 'pino';

const LOGGER_LEVEL = process.env.LOG_LEVEL || 'info';
const isDev = process.env.NODE_ENV === 'development';

const Logger = pino({
  level: LOGGER_LEVEL,
  prettyPrint: isDev
    ? {
        hideObject: LOGGER_LEVEL !== 'trace',
      }
    : false,
});

// eslint-disable-next-line import/no-default-export
export default Logger;
