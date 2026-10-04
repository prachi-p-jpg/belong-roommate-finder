const mongoose = require('mongoose');

// Define the blueprint for what a User should look like
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    default: "New User"
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: false,
    default: ""
  },
  password: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: false // Optional field
  },
  occupation: {
    type: String,
    required: false // Optional field
  },
  about: {
    type: String,
    required: false // Optional field
  }
}, {
  // Automatically adds `createdAt` and `updatedAt` timestamps
  timestamps: true
});

// Create the model from the schema
const User = mongoose.model('User', userSchema);

// Export it so we can use it in other files
module.exports = User;
