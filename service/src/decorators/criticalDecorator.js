import logger from '../helpers/logger';
import baseDecorator from './baseDecorator';

export default baseDecorator({
    onStart({ callContext, methodInfo }) {
        logger.log('CRITICAL');
    },
});

