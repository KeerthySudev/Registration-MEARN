const mongoose = require('mongoose');

// Define the schema for a user
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // User's name
  email: { type: String, required: true, unique: true }, // User's email, must be unique
  phone: { type: String, required: true }, // User's phone number
  dob: { type: Date, required: true }, // User's date of birth
  aadhaar: { type: String, required: true } // User's Aadhaar number, must be unique
});

// Create and export the User model based on the schema
// export default mongoose.model('User', userSchema);

const User = mongoose.model('User', userSchema);
module.exports = User;
