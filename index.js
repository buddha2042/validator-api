import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const app = express();
const port = 3000;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dynamically load route handlers from the 'routes' directory
const routerDirectory = path.join(__dirname, 'routes');
const files = await fs.readdir(routerDirectory);

for (const file of files) {
  if (file.endsWith('.js')) {
    const { default: routeHandler } = await import(path.join(routerDirectory, file));
    routeHandler(app);
  }
}

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
