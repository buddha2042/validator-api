import { getUserByUsername, createUser } from '../../services/user/userServices.js';

// Controller to handle GET request for a user by username
const getUser = async (req, res) => {
  const { email } = req.query;
  console.log('controller:', email)
  try {
    const user = await getUserByUsername(email);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller to handle POST request to create a new user
const addUser = async (req, res) => {
  const { username } = req.body;
  try {
    const newUser = await createUser(username);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const userController = {
  getUser,
  addUser
};

export default userController;
