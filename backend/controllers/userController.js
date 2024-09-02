const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

function generateOtp() {
  return crypto.randomInt(100000, 999999).toString();
}
    const otp = generateOtp();

// Controller function to handle user registration
const registerUser = async (req, res) => {
  try {
    // Extract user data from the request body
    const { name, email, phone, dob, aadhaar } = req.body;

    if (!name || !email || !phone || !dob || !aadhaar) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new user instance
    const newUser = new User({ name, email, phone, dob, aadhaar });

    // Save the user to the database
    await newUser.save();

    // Send a success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(500).json({ error: error.message });
  }
};

const mobileVerify = async (req, res) => {
    try {
      // Extract the email from query parameters
      const userEmail = req.query.email;

      
  
      if (!userEmail) {
        return res.status(400).json({ message: 'Email is required' });
      }
  
      // Query the database to find a user with the given email
      const user = await User.findOne({ email: userEmail });
      
      // Check if a user was found
      if (user) {
        // Return the user data as JSON
        res.json(user);
      } else {
        // Return a 404 status if no user was found
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      // Log the error and return a 500 status for server errors
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };


// Define the async function for email verification
const emailVerify = async (req, res) => {
  // Extract the email from the request body
  const { email } = req.body; // Use req.body instead of body.query

  // Example email for demonstration
   // This should ideally be replaced with the email passed in the request

  // Define your OTP (for demonstration purposes, replace with your actual OTP generation logic)
  // const otp = '123456'; // Generate or retrieve the OTP to be sent

  // Create a Nodemailer transporter using Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Using Gmail as the email service
    auth: {
      user: 'keerthisudev22@gmail.com', // Sender's email address
      pass: 'jcfs hhxe uytn bubn', // Sender's email password or app-specific password
    },
  });

  // Define the mail options
  const mailOptions = {
    from: 'keerthisudev22@gmail.com', // Sender's email address
    to: email, // Recipient's email address
    subject: 'Email Verification', // Subject of the email
    html: `Your OTP code is ${otp}.`, // Email content with the OTP
  };


  try {
    // Attempt to send the email
    await transporter.sendMail(mailOptions);
    // If successful, send a response back to the client
    res.status(200).send('Verification email sent successfully');
  } catch (error) {
    // If an error occurs, send an error response with the error message
    console.error('Error sending email:', error.message); // Debugging: Log the error message
    res.status(500).send('Error sending email: ' + error.message);
  }
};

// Function to verify OTP
// Function to verify OTP
async function verifyOtp(req, res) {
  if (req.method === 'POST') {
    const userOtp = req.body.otp;

    // Debugging: Log received OTP
    console.log('Received OTP:', userOtp);

    if (!userOtp) {
      console.error('OTP is missing');
      return res.status(400).send('OTP is required.');
    }

    // Assume 'otp' is globally available or fetched from somewhere
    // const storedOtp = '123456';

    // Debugging: Log stored OTP
    console.log('Stored OTP:', otp);

    // Check if the OTP exists and matches
    if (otp && otp === userOtp) {
      // OTP is valid
      console.log('OTP verification successful');
      return res.status(200).send('OTP verified successfully!');
    } else {
      // OTP is invalid
      console.error('Invalid OTP');
      return res.status(400).send('Invalid OTP.');
    }
  } else {
    console.error(`Method ${req.method} Not Allowed`);
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}







// // Function to verify OTP
// async function verifyOtp(req, res) {
//   if (req.method === 'POST') {
//     const userOtp  = req.body.otp;

//     if (!userOtp) {
//       return res.status(400).send(' OTP is required.');
//     }

//     const storedOtp = 123456;

//     // Check if the OTP exists and matches
//     if (storedOtp && storedOtp === userOtp) {
//       // OTP is valid
//      // Remove OTP after use
//       res.status(200).send('OTP verified successfully!');
//     } else {
//       // OTP is invalid
//       res.status(400).send('Invalid OTP.');
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }


  module.exports = { verifyOtp, emailVerify, mobileVerify , registerUser};



