import express from 'express';
import dotenv from 'dotenv';
// import mongoose from './config/database.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
dotenv.config();

// Create Express app
const app = express();

// Middleware to parse JSON
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

export default app;
