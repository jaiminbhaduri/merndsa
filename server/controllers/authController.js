import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { JWT_SECRET } from '../config.js';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || name.trim() === '') {
            return res.status(400).json({ message: 'Name is required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password should be atleast 6 characters' });
        }

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email already exists' });

        const hashed = await bcrypt.hash(password, 10);

        // Save name to DB
        const user = new User({ name, email, password: hashed });
        await user.save();

        res.status(201).json({ message: 'User registered' });
    } catch (error) {
        console.error('REGISTER_ERROR', error);
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, name: user.name });
    } catch (error) {
        console.error('LOGIN_ERROR', error);
        res.status(500).json({ error: error.message });
    }
};
