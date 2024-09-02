const mongoose = require('mongoose');

// Define the schema for a user
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  email: { type: String, required: true, unique: true }, 
  phone: { type: String, required: true }, 
  dob: { type: Date, required: true }, 
  aadhaar: { type: String, required: true } 
});

// Create and export the User model based on the schema

const User = mongoose.model('User', userSchema);
module.exports = User;
