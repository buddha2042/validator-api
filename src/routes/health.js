import logger from '../utils/logger.js';

export default (app)=>{
  app.post('/health', async (req, res)=>{
    try {
      logger.info('Health check endpoint accessed');
      res.status(200).json({ message: 'The health check passed' })
    } catch (error) {
      logger.error(`Error in health check: ${error.message}`);
      res.status(500).json({ error: 'Internal server error' });
    }
 
  })
};
  