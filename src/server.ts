import app from './app';
import logger from '../src/logger/logger'

app.listen(app.get('port'), () => {
    logger.info(`Server listening on port ${app.get('port')}`);
})