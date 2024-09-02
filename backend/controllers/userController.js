const User = require("../models/User");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

/**
 * generateOtp - Function to generate a random 6-digit OTP.
 *
 * @returns {string}
 */
function generateOtp() {
  // Generate a random integer between 100000 and 999999 (inclusive)
  return crypto.randomInt(100000, 999999).toString();
}
const otp = generateOtp();

/**
 * registerUser - Registers a new user in the database.
 *
 *
 * @param {Object} req
 * @param {Object} res
 */
const registerUser = async (req, res) => {
  try {
    // Extract user data from the request body
    const { name, email, phone, dob, aadhaar } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !phone || !dob || !aadhaar) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the email already exists in the database
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Create a new user instance
    const newUser = new User({ name, email, phone, dob, aadhaar });

    // Save the user to the database
    await newUser.save();

    // Send a success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(500).json({ error: error.message });
  }
};

/**
 * mobileVerify - Verifies a user's mobile by email lookup.
 *
 * @param {Object} req
 * @param {Object} res
 */
const mobileVerify = async (req, res) => {
  try {
    // Extract the email from query parameters
    const userEmail = req.query.email;

    // Check if the email is provided
    if (!userEmail) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Query the database to find a user with the given email
    const user = await User.findOne({ email: userEmail });

    // Check if a user was found
    if (user) {
      // Return the user data as JSON
      res.json(user);
    } else {
      // Return a 404 status if no user was found
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // Log the error and return a 500 status for server errors
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * emailVerify - Sends an OTP code to the provided email address for verification.
 *
 * @param {Object} req
 * @param {Object} res
 */
const emailVerify = async (req, res) => {
  // Extract the email from the request body
  const { email } = req.body;

  // Create a Nodemailer transporter using Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail", // Using Gmail as the email service
    auth: {
      user: "keerthisudev22@gmail.com",
      pass: "jcfs hhxe uytn bubn",
    },
  });

  // Define the mail options
  const mailOptions = {
    from: "keerthisudev22@gmail.com",
    to: email,
    subject: "Email Verification",
    html: `Your OTP code is ${otp}.`,
  };

  try {
    // Attempt to send the email
    await transporter.sendMail(mailOptions);
    // If successful, send a response back to the client
    res.status(200).send("Verification email sent successfully");
  } catch (error) {
    // If an error occurs, send an error response with the error message
    console.error("Error sending email:", error.message); // Debugging: Log the error message
    res.status(500).send("Error sending email: " + error.message);
  }
};

/**
 * verifyOtp - Verifies the provided OTP against the stored OTP.
 *
 *
 * @param {Object} req
 * @param {Object} res
 */
async function verifyOtp(req, res) {
  if (req.method === "POST") {
    const userOtp = req.body.otp;

    // Debugging: Log received OTP
    console.log("Received OTP:", userOtp);

    if (!userOtp) {
      console.error("OTP is missing");
      return res.status(400).send("OTP is required.");
    }

    // Debugging: Log stored OTP
    console.log("Stored OTP:", storedOtp);

    // Check if the OTP exists and matches
    if (storedOtp && storedOtp === userOtp) {
      // OTP is valid
      console.log("OTP verification successful");
      return res.status(200).send("OTP verified successfully!");
    } else {
      // OTP is invalid
      console.error("Invalid OTP");
      return res.status(400).send("Invalid OTP.");
    }
  } else {
    console.error(`Method ${req.method} Not Allowed`);
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

module.exports = { verifyOtp, emailVerify, mobileVerify, registerUser };
