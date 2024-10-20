import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';

// User management
export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try{
        const userExists = await User.findOne({ email });
        if(userExists){
            return res.status(400).json({ message: `User already exists` });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: `User created successfully1` });
    }catch(error){
        res.status(500).json({ message: `Internal Server Error - ${error.message}` });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    
    try{
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: `User does not exists` });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({ message: `Invalid Credentials`})
        }

        const token = jwt.sign({ userId:user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict', 
            maxAge: 3600000 // 1 hour
        });

        res.status(200).json({ message: `Login successful` });
    }catch(error){
        res.status(500).json({ message: `Internal Server Error - ${error.message}` });
    }
};

export const logout = async (req, res) => {
    res.clearCookie('token');

    res.status(200).json({ message: `Logged out successfully` });
};

// Profile management
export const getProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user.userId).select('-password');
        if(!user){
            return res.status(404).json({ message: `User not found` });
        }

        res.status(200).json({ user });
    }catch(error){
        res.status(500).json({ message: `Internal Server Error - ${error.message}` });
    }
};

export const updateProfile = async (req, res) => {
    const { username, email, password } = req.body;

    try{
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ message: `User not found` });

        user.username = username || user.username;
        user.email = email || user.email;

        if(password){
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();

        res.status(200).json({ message: `Profile updated`, user });
    }catch(error){
        res.status(500).json({ message: `Internal Server Error - ${error.message}` });
    }
};

export const deleteAccount = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if(!user){
            return res.status(404).json({ message: `User not found` });
        }

        await user.remove();

        res.status(200).json({ message: `User account deleted` });
    }catch(error){
        res.status(500).json({ message: `Internal Server Error - ${error.message}` });
    }
};