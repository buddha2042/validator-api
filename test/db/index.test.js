// user.test.js
'use strict';

import sequelize from '../../db/models/index';

beforeAll(async () => {
  await sequelize.authenticate(); 
});

afterAll(async () => {
  await sequelize.close();
});

describe('Database connection', () => {
  test('should authenticate successfully', async () => {
      await sequelize.authenticate();
  });
});
