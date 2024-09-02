const express = require('express');
const { registerUser } = require('../controllers/userController');
const { mobileVerify } = require('../controllers/userController');
const { emailVerify } = require('../controllers/userController');
const { verifyOtp } = require('../controllers/userController');
const { verifyAadhar } = require('../controllers/authController');
const { verifyPAN } = require('../controllers/authController');
const { verifyGST } = require('../controllers/authController');
const { verifyBank } = require('../controllers/authController');
const { getBank } = require('../controllers/authController');
const { addressLookup } = require('../controllers/addressController');

const router = express.Router();

// Define the route for various functions
router.post('/register', registerUser);
router.get('/verify', mobileVerify);
router.post('/emailVerify', emailVerify);
router.post('/verifyOtp', verifyOtp);
router.post('/authenticate', verifyAadhar);
router.post('/PAN', verifyPAN);
router.post('/GST', verifyGST);
router.post('/bank', verifyBank);
router.post('/getBank', getBank);
router.post('/address', addressLookup);

// Export the router to be used in the main server file

module.exports = router;















// Get user by email
// router.get('/users', getUserByEmail);

// module.exports = router;
