import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import transporter from "../utils/nodemailer.js";
import BlacklistToken from "../models/blacklistModel.js";
import PreferenceName from "../models/preferenceNameModel.js";

export const register = async (req, res) => {
    const { FirstName, LastName, Password, Email, googleId } = req.body;

    // Validate input data
    if (!FirstName || !Email || !Password || !LastName) {
        return res.json({ success: false, message: "Invalid data provided!" });
    }

    try {
        // Check if the email already exists
        const existingUser = await userModel.findOne({
            email: { $regex: new RegExp(`^${Email}$`, 'i') }
        });

        // If the user exists, return an error
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(Password, 12);

        // Prepare user data
        const userData = {
            FirstName,
            LastName,
            Email,
            Password: hashedPassword
        };        // Add googleId only if it's a non-empty string
        if (typeof googleId === 'string' && googleId.trim() !== '' && googleId !== 'null') {
            userData.googleId = googleId;
        }

        // Create a new user
        const newUser = new userModel(userData);

        // Save the user to the database
        await newUser.save();

        // Generate a JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Set the token in cookies
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Send a welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: Email,
            subject: "Welcome to INTS or InTo StartUps",
            text: `Welcome to INTS or InTo Startups. Your account has been created with email: ${Email}.`
        };

        await transporter.sendMail(mailOptions);

        // Return success response
        return res.json({ success: true });

    } catch (error) {
        console.log("Error in registration:", error);
        return res.json({ success: false, message: error.message });
    }
};











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

export const profile = async (req, res) => {
    try {
        return res.status(201).json({ user: req.user });

    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error  in profile");
    }
}



export const createPreferenceName = async (req, res) => {
    const { preferenceName } = req.body;
    const userId = req.user?._id;

    if (!preferenceName) {
        return res.status(400).json({ error: "Preference name is required" });
    }

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized: User ID missing" });
    }

    try {
        const updated = await PreferenceName.findOneAndUpdate(
            { user: userId },
            { preferenceName },
            { new: true, upsert: true } // upsert = insert if not found
        );

        return res.status(200).json({ preferenceName: updated.preferenceName });
    } catch (error) {
        console.error("Preference name error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Get preference name for current user
export const getPreferenceName = async (req, res) => {
    const userId = req.user?._id;

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized: User ID missing" });
    }

    try {
        const pref = await PreferenceName.findOne({ user: userId });
        if (!pref) {
            return res.status(200).json({ preferenceName: null });
        }

        return res.status(200).json({ preferenceName: pref.preferenceName });
    } catch (error) {
        console.error("Fetch preference name error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
