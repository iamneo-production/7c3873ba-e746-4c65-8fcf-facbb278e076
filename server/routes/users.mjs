import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all users.
router.get("/", async (req, res) => {
  let collection = await db.collection("users");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single user by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("users");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("User not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new user.
router.post("/", async (req, res) => {
  let newUser = {
    username: req.body.username,
    email: req.body.email,
    // Add other user fields as needed
  };
  let collection = await db.collection("users");
  let result = await collection.insertOne(newUser);
  res.send(result).status(201);
});

// This section will help you update a user by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      username: req.body.username,
      email: req.body.email,
      // Update other user fields as needed
    }
  };

  let collection = await db.collection("users");
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

// This section will help you delete a user
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("users");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

// This section will help you register a new user.
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user with the provided email already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      email,
      password: hashedPassword,
      // Add other user fields as needed
    };

    const collection = await db.collection('users');
    const result = await collection.insertOne(newUser);

    res.status(201).json({ message: 'Registration successful', userId: result.insertedId });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// This section will help you authenticate a user.
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // TODO: You can use JWT or sessions for generating tokens here
    // For simplicity, just sending a success message
    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});


export default router;
