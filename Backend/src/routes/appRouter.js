import express from 'express'
import authRouter from './authRouter.js';
import axios from 'axios';
import { query } from 'express-validator';


const appRouter = express.Router();

appRouter.use('/auth', authRouter)




export default appRouter