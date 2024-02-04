const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for parsing JSON data
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Replace the following placeholder with your actual MongoDB connection string and database name
const mongoURI = 'mongodb+srv://darshanloni16:2X6xqGSkXYXhIphb@cluster0.o7wz40d.mongodb.net/food?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a mongoose connection
const db = mongoose.connection;

// Handle MongoDB connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a user schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

// Create a User model based on the schema
const User = mongoose.model('User', userSchema);

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Please fill in every input field' });
  }

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Save the user data to MongoDB
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Respond with the registered user
    res.json({ message: 'Registration successful', user: newUser });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Your other routes and server logic go here...

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
