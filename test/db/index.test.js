// user.test.js
'use strict';
import { getUserByUsername, createUser } from '../../src/services/user/userServices.js';
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

// describe('Get user', () => {
//   test('should fetch a user from the database', async () => {
//     const email = 'abc@a.com'
//     const user = await getUserByUsername(email);;
//     expect(user).toBeDefined(); 
//     expect(user.email).toEqual(email); 
//   });
// });
