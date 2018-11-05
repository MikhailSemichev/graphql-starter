import logger from '../helpers/logger';
import baseDecorator from './baseDecorator';

export default baseDecorator({
    onStart({ callContext, methodInfo }) {
        //
    },
    onSuccess({ callContext, methodInfo }) {
        //
    },
    onError({ methodInfo, args, error }) {
        logger.logCritical('CRITICAL SLACK', error);
    },
});

