import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {

    const { FirstName, LastName, Password, Email } = req.body

    if (!FirstName || !Email || !Password || !LastName) {
        return res.json({ success: false, message: "Invalid data is provided !!!" });
    }

    try {

        const ExistingUser = await userModel.findOne({ Email });
        if (ExistingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(Password, 12);

        const user = await userModel.create({
            FirstName,
            LastName,
            Email,
            Password: hashedPassword
        })

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })

        res.cookie('token', token, {
            htttpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: (process.env.NODE_ENV === 'production') ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });


     return res.json({success:true});

    } catch (error) {
        console.log(error)
        res.json({ message: error.message })
    }
}