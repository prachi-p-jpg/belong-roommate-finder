const express = require('express');
const router = express.Router();

// Import our controller functions
const { registerUser, loginUser } = require('../controllers/authController');

// Define the POST route for /api/auth/register
router.post('/register', registerUser);

// Define the POST route for /api/auth/login
router.post('/login', loginUser);

module.exports = router;
