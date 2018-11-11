import { createLogger, format, transports, config } from 'winston';

const logger = createLogger({
    level: 'info',
    levels: config.syslog.levels,
    format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.File({ filename: 'logs/all.log', timestamp: true }),
        new transports.File({ filename: 'logs/error.log', level: 'error', timestamp: true }),
        new transports.Console({ level: 'crit' }), // Slack Channel message
    ],
    /*
    exceptionHandlers: [
        new transports.File({
            filename: 'logs/unhandledErrors.log', timestamp: true,
            handleExceptions: true,
        }),
    ],
    handleExceptions: true,
    exitOnError: true,
    */
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console());
}

export default {
    log(message) {
        logger.log('info', message);
    },

    logError(message, error) {
        const errorText = error && error.stack ? `${error.stack}` : `${error}`;
        logger.log('error', `${message} ${errorText}`);
    },

    logCritical(message, error) {
        const errorText = error && error.stack ? `${error.stack}` : `${error}`;
        logger.log('crit', `${message} ${errorText}`);
    },
};
