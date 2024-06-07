import { getUserByUsername, createUser } from '../../services/user/userServices.js';
import logger from '../../utils/logger.js';

// Controller to handle GET request for a user by username
const getUser = async (req, res) => {
  const { email } = req.query;
  try {
    const user = await getUserByUsername(email);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    logger.error({ message: `Internal Server Error: ${error.name}-${error.parent}` })
    res.status(500).json({ message: `Internal Server Error ` });
  }
};

// Controller to handle POST request to create a new user
const addUser = async (req, res) => {
  const { email, password, username, first_name, last_name } = req.body;

  try {
    const newUser = await createUser(email, password, username, first_name, last_name);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error)
    logger.error(({ message: `Internal Server Error: ${error.name}-${error.parent}`}))
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const userController = {
  getUser,
  addUser
};

export default userController;
