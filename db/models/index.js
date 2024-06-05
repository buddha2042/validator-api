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
    logger.info(`Database [ ${dbConfig.database} ] connected successfully `);
  })
  .catch((err) => {
    logger.error(`Unable to connect to the database: ${err}`);
  });

let db = {};

// Dynamically import all models
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const importModels = async () => {
  const files = await fs.readdir(__dirname);
  for (const file of files) {
    if (file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js') {
      const modelPath = 'file://' + path.join(__dirname, file); 
      const model = await import(modelPath);
      db[model.default.name] = model.default(sequelize, Sequelize.DataTypes);
    }
  }
};

importModels()
  .then(() => {
    // Set up model associations
    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });
  })
  .catch(error => {
    logger.error(`Error importing models: ${error}`);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
