import express from 'express';
import { login, logout, profile, register } from '../controllers/userController.js';
import { loginValidator, registerValidator, validate } from '../utils/validator.js';
import { googleCallback, loginWithGoogle } from '../controllers/googleController.js';
import authUser from '../../middlewares/authMiddleware.js';

const authRouter = express.Router();

authRouter.post('/register',validate(registerValidator),register );
authRouter.post('/login',validate(loginValidator),login );
authRouter.get('/google',loginWithGoogle);
authRouter.get('/google/callback',googleCallback);
authRouter.post('/logout',authUser,logout);
authRouter.get('/profile',authUser,profile);


export default authRouter