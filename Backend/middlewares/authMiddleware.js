import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import BlacklistToken from '../src/models/blacklistModel.js';
import userModel from '../src/models/userModel.js';

const authUser = async (req, res, next) => {
  const authHeader = req.headers.Authorization;
  const token = req.cookies.token || (authHeader && authHeader.startsWith("Bearer ") && authHeader.split(" ")[1]);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized user - no token provided" });
  }

  const isBlacklisted = await BlacklistToken.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ error: "Unauthorized user - token blacklisted" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decodedToken.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error on auth middleware" });
  }
};

export default authUser;
