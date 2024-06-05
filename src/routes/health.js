import logger from '../utils/logger.js';

export default (app)=>{
  logger.info('Health check endpoint stalibished');
  app.post('/health', async (req, res)=>{
    try {
      res.status(200).json({ message: 'The health check passed' })
    } catch (error) {
      logger.error(`Error in health check: ${error.message}`);
      res.status(500).json({ error: 'Internal server error' });
    }
 
  })
};
  