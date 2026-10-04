const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async (req, res) => {
  try {
    console.log("REGISTER BODY RECEIVED:", req.body);
    const { name, email, phone, password, photo, occupation, about } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide all required fields (email, password)",
        receivedBody: req.body // Helps you debug what Postman actually sent
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      photo,
      occupation,
      about
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};


// Login a user
const loginUser = async (req, res) => {
  try {

    // req.body must be accessed INSIDE the function
    const { email, password } = req.body;

    console.log("LOGIN BODY:", req.body);

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide both email and password"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'fallback_secret_key_if_env_is_missing',
      { expiresIn: '30d' }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Error in loginUser:", error);

    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};


module.exports = {
  registerUser,
  loginUser
};