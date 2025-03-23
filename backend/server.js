require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import the cors package
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const auth = require('./middleware/auth');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: 'http://localhost:5176', // Allow requests from your frontend origin
    credentials: true, // Allow cookies and credentials
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', auth, taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
