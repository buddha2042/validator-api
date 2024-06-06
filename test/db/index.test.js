// user.test.js
'use strict';

import { db } from '../../db/models/index';

beforeAll(async () => {
  await db.sequelize.authenticate(); 
});

afterAll(async () => {
  await db.sequelize.close();
});

describe('Database connection', () => {
  test('should authenticate successfully', async () => {
      await db.sequelize.authenticate();
  });
});
