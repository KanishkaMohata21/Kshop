import bcrypt from 'bcryptjs'; 
import User from "../models/userModel.js";
import JWT from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const { name, email, question, password } = req.body;
        if (!name || !email || !question || !password ) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            question
        });
        await newUser.save();
        return res.status(201).json({ msg: "User registered successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ msg: "User does not exist" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ msg: "Invalid password" });
        }
        const token = JWT.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });
        return res.status(200).json({ result: existingUser, token });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });       
    }
}


export const adminpanel = async (req, res) => {
    res.status(200).send({ok:true})

}
export const forgetPassword = async (req, res) => {
    console.log("hello")
    try {
        const { email, question, newPassword } = req.body;
        
        if (!email) {
            return res.status(400).send({ ok: false, message: "Please enter your email" });
        }
        if (!question) {
            return res.status(400).send({ ok: false, message: "Please enter your security question" });
        }
        if (!newPassword) {
            return res.status(400).send({ ok: false, message: "Please enter your new password" });
        }

        const user = await User.findOne({ email, question });
        if (!user) {
            return res.status(400).send({ ok: false, message: "User does not exist" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        
        res.status(200).send({ ok: true, message: "Password changed successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ ok: false, message: "Something went wrong" });
    }
};