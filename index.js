import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import taskRoutes from './routes/tasks.js';
import authRoutes from './routes/auth.js';
import authenticate from './middleware/auth.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js'

const app = express();

// Middleware
app.use(bodyParser.json());

dotenv.config();

// for ngrock server
app.use(cors({
    origin: '*', // Be cautious with this in production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
// app.use((req, res, next) => {
//     console.log(`Received ${req.method} request to ${req.url}`);
//     next();
//   });
  

connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', authenticate, taskRoutes);

// Start the server
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});