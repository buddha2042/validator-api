import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import  sequelize   from '../db/models/index.js';

dotenv.config();
const app = express();
app.use(express.json());

// Helper to get __dirname when using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dynamically load route handlers from the 'routes' directory
const loadRoutes = async () => {
  const routerDirectory = path.join(__dirname, 'routes');
  const files = await fs.readdir(routerDirectory);

  for (const file of files) {
    if (file.endsWith('.js')) {
      // Convert file path to URL
      const routeHandlerPath = 'file://' + path.join(routerDirectory, file);
      // Import the module using the file URL
      const { default: routeHandler } = await import(routeHandlerPath);
      // Register the route handler with the app
      routeHandler(app);
    }
  }
};

// Load all routes
await loadRoutes();

// Verify the database connection status
await sequelize.authenticate()

export default app;
