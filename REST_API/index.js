// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3500;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// In-memory storage for users
let users = [
  { id: 1, name: "John Doe", email: "john.doe@example.com" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
];

// 1. GET /users - Retrieve all users
app.get('/users', (req, res) => {
  res.status(200).json(users);
});

// 2. POST /users - Add a new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  // Validate request body
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  // Create a new user with a unique ID
  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name,
    email,
  };

  // Add new user to the users array
  users.push(newUser);

  res.status(201).json(newUser);
});

// 3. DELETE /users/:id - Delete a user by ID
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);

  // Find the user by ID
  const userIndex = users.findIndex((user) => user.id === userId);

  // If user not found, return 404
  if (userIndex === -1) {
    return res.status(404).json({ error: `User with ID ${userId} not found` });
  }

  // Remove user from the array
  users.splice(userIndex, 1);

  res.status(200).json({ message: `User with ID ${userId} deleted successfully` });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
