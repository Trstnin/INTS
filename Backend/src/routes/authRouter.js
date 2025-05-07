import express from 'express';
import { login, register } from '../controllers/userController.js';
import { loginValidator, registerValidator, validate } from '../utils/validator.js';

const authRouter = express.Router();

authRouter.post('/register',validate(registerValidator),register )
authRouter.post('/login',validate(loginValidator),login )

export default authRouter