import Sequelize from 'sequelize';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import config from '../config/config.js';
import logger from '../../src/utils/logger.js';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    logger.info(`Database [ ${dbConfig.database} ] connected successfully`);
  })
  .catch((err) => {
    logger.error(`Unable to connect to the database: ${err}`);
  });

let db = {};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const importModels = async () => {
  const files = await fs.readdir(__dirname);
  for (const file of files) {
    if (file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js') {
      const modelPath = 'file://' + path.join(__dirname, file); 
      const modelModule = await import(modelPath);
      const model = modelModule.default;
      if (typeof model === 'function') {
        const initializedModel = model(sequelize, Sequelize.DataTypes);
        db[initializedModel.name] = initializedModel;
      } else {
        logger.error(`Model ${file} does not export a function`);
      }
    }
  }
};

const initializeModels = async () => {
  try {
    await importModels();
    // Set up model associations
    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });
    logger.info('Models imported and associations set up successfully.');
  } catch (error) {
    logger.error(`Error importing models: ${error}`);
  }
};

initializeModels();

// Expose sequelize and Sequelize
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export the db object containing all models
export { sequelize, Sequelize, db };
