import { createLogger, format, transports } from 'winston';

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

export default {
    logError(message, error) {
        const errorText = error && error.stack ? `${error.stack}` : `${error}`;
        logger.log('error', `${message} ${errorText}`);
    },

    log(message) {
        logger.log('info', message);
    },
};
