const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) { return res.status(404).json({ message: 'Invalid Credentials!' }) }

        const isExisting = await User.findOne({ email });
        if (isExisting) { return res.status(400).json({ message: 'Already Registered!' }) }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ ...req.body, password: hashedPassword });

        const token = jwt.sign({ userId: user?._id }, process.env.SECRET);
        res.json({ message: 'User Registered!', user, token })
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error!' });
        console.log('Internal Server Error! \n', error)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) { return res.status(404).json({ message: 'Invalid Credentials!' }) }

        const user = await User.findOne({ email });
        if (!user) { return res.status(400).json({ mesasge: 'Not Registered!' }) }

        const isMatch = await bcrypt.compare(password, user?.password);
        if (!isMatch) { return res.status(400).json({ message: 'Wrong Password!' }) }

        const token = jwt.sign({ userId: user?._id }, process.env.SECRET);
        res.json({ message: 'User Logged In!', user, token })
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error!' });
        console.log('Internal Server Error! \n', error)
    }
}

module.exports = { register, login };