const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const generateToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, {expiresIn: '3d'});
};

const signupUser = async (req, res) => {
    const {fullName, email, password, phoneNumber, gender, date_of_birth, accountType } = req.body;
    try {
        if (!fullName || !email || !password || !phoneNumber || !gender || !date_of_birth || !accountType) {
            return res.status(400).json({ message: "Please add all fields"})
        }
        
        const exist = await User.findOne({ email });
        if (exist) return res.status(400).json({ message: "Email already used"});

        const salt = await bcrypt.genSalt(10);
        const hashedPW = await bcrypt.hash(password, salt);

        const user = await User.create({
            fullName,
            email,
            password: hashedPW,
            phoneNumber,
            gender,
            date_of_birth,
            accountType,
        });

        const token = generateToken(user._id);
        res.status(201).json({user, token});
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
};

const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if ( user && (await bcrypt.compare(password, user.password))) {
            const token = generateToken(user._id);
            return res.status(200).json({email, token});
        }
        res.status(400).json({ message: "Invalid credentials"});
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
};

module.exports = {signupUser, loginUser};
