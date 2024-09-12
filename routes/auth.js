// routes/auth.mjs
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

const JWT_SECRET=process.env.JWT_SECRET;
// Register
router.post('/register', async (req, res) => {
    console.log('Registration route hit');
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'User registered' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '12h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
