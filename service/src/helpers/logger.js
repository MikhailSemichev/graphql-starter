const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info',
    // format: format.json(),
    format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    exceptionHandlers: [
        new transports.File({
            filename: 'logs/unhandledErrors.log', timestamp: true,
            handleExceptions: true,
        }),
    ],
    transports: [
        new transports.File({ filename: 'logs/all.log', timestamp: true }),
        new transports.File({ filename: 'logs/error.log', level: 'error', timestamp: true }),
    ],
    handleExceptions: true,
    exitOnError: true,
});


if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.simple(),
    }));
}

module.exports = {
    logError(message, error) {
        logger.log('error', `${message} ${error.message}`);
    },

    log(message) {
        logger.log('info', message);
    },
};
