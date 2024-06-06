import { db } from '../../../db/models/index.js';

const { User } = db;

// Function to get a user by username
export const getUserByUsername = async (email) => {
   console.log(email)
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    throw error;
  }
};

// Function to create a new user
export const createUser = async (username) => {
  try {
    const newUser = await User.create({ username });
    return newUser;
  } catch (error) {
    throw error;
  }
};
