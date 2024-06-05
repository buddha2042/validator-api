import Sequelize from 'sequelize';
import config from '../config/config.js';
import logger from '../../src/utils/logger.js';


const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];


const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    logger.info('Database connected successurlly')
  })
  .catch((err) => {
    logger.error(`Unable to connect to the database: ${err}`);
  });

export default sequelize
