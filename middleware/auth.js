// middleware/auth.mjs
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ error: 'No token provided' });
    }

    // console.log('Token:', token);

    const tokenValue = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

    jwt.verify(tokenValue, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.status(500).json({ error: 'Failed to authenticate token' });
        }

        req.userId = decoded.id;
        next();
    });
};

export default authenticate;
