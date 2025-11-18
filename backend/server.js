const express = require('express');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Load env variables
dotenv.config({ path: './config/config.env' });

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Cookie parser
app.use(cookieParser());

// Connect to database
connectDB();

// Import Routes
const authRoutes = require('./routes/auth');
const teamRoutes = require('./routes/teams');

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/teams', teamRoutes);

app.use(errorHandler);

// Health Check
app.get('/', (req, res) => {
    res.json({ message: 'Smart Task Manager API is running' });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server and exit process
    server.close(process.exit(1));
})