import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import axios from "axios";
import transporter from "../utils/nodemailer.js";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// Step 1: Redirect user to Google login
export const loginWithGoogle = (req, res) => {
  const redirectURL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&scope=profile%20email&access_type=offline`;
  res.redirect(redirectURL);
};

// Step 2: Handle Google OAuth callback
export const googleCallback = async (req, res) => {
    const code = req.query.code;
  
    try {
      // Step 2.1: Exchange authorization code for access token
      const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      });
  
      const access_token = tokenRes.data.access_token;
  
      // Step 2.2: Get user info from Google
      const userRes = await axios.get(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`
      );
  
      const { email, name, picture, id: googleId } = userRes.data;
      const [firstName, ...lastParts] = name.split(" ");
      const lastName = lastParts.join(" ");
  
      // Step 2.3: Check if user exists in DB
      let user = await userModel.findOne({ Email: email });
  
      if (!user) {
        // Step 2.4: Create new user with Google-specific fields
        user = await userModel.create({
          FirstName: firstName,
          LastName: lastName || "-",
          Email: email,
          Password: "", // No password for Google login
          googleId: googleId, // Store Google ID
        });
      }
  
      // Step 2.5: Issue JWT token
      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
  
      // Step 2.6: Set token in cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

              //sending welcome email:

              const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: email,
                subject:"Welcome to INTS or InTo StartUps",
                text:`Welcome to INTS or InTo Startups. Your account has been created with email id : ${email} `
            }
    
            await transporter.sendMail(mailOptions)
    
  
      // Step 2.7: Redirect back to frontend
      res.redirect(`http://localhost:5173/oauth-success?token=${token}`);
    } catch (err) {
      console.error("Google OAuth Error:", err);
      res.status(500).send("Google login failed");
    }
  };
  