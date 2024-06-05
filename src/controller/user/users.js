import db from "../../../db/models/index.js";

export const createUser = async (req, res) => {
    // console.log(req.body) 
  try {
    const { username, email } = req.body;
    const newUser = await db.create({ username, email });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default createUser