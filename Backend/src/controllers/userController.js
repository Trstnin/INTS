import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import transporter from "../utils/nodemailer.js";
import BlacklistToken from "../models/blacklistModel.js";

export const register = async (req, res) => {

    const { FirstName, LastName, Password, Email, avatarUrl } = req.body

    if (!FirstName || !Email || !Password || !LastName) {
        return res.json({ success: false, message: "Invalid data is provided !!!" });
    }

    if (avatarUrl === '') {
        avatarUrl = "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-1024.png"
    }

    try {

        const ExistingUser = await userModel.findOne({ Email });
        if (ExistingUser) {
            return res
            .status(400)
            .json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(Password, 12);

        const user = await userModel.create({
            FirstName,
            LastName,
            Email,
            Password: hashedPassword,
            avatarUrl
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

        //sending welcome email:

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: Email,
            subject: "Welcome to INTS or InTo StartUps",
            text: `Welcome to INTS or InTo Startups. Your account has been created with email id : ${Email} `
        }

        await transporter.sendMail(mailOptions)

        return res.json({ success: true });

    } catch (error) {
        console.log(error)
        res.json({ message: error.message })
    }
}

export const login = async (req, res) => {
    const { Email, Password } = req.body

    if (!Email || !Password) {
        return res.json({ success: false, message: "Invalid data entry !!!" });
    }

    try {
        const user = await userModel.findOne({ Email });

        if (!user) {
            return res
            .status(400)
             .json({ success: false, message: "Invalid Email !!!" });
        }

        const isMatch = bcrypt.compare(Password, user.Password);

        if (!isMatch) {
            return res
            .status(400)
            .json({ success: false, message: "Invalid Password" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })

        res.cookie("token", token, {
            htttpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: (process.env.NODE_ENV === 'production') ? "none" : "strict"
        })


        return res.json({ success: true, token: token });


    } catch (error) {
        res.json({ message: error.message, success: false }).status(500);
        console.log(error)
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        await BlacklistToken.create({ token });
        res.status(200).json("Logout Successfully");

    } catch (error) {
        console.log(error);
        res.status(500).json("Internal xerver error in logout")
    }
}

export const profile = async (req,res) => {
    try {
        return res.status(201).json({user:req.user});
        
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error  in profile");
    }
}