const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');


const app = express();
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// Use the user routes for API endpoints
app.use('/api/users', userRoutes);

// Connect to MongoDB using Mongoose
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/task';
mongoose.connect(MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





