import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';

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
    console.log(email, password)
    
    try{
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: `User does not exists` });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({ message: `Invalid Credentials`})
        }

        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({ token: token});

    }catch(error){
        res.status(500).json({ message: `Internal Server Error - ${error.message}` });
    }
};