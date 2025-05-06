import express from 'express'
import authRouter from './authRouter.js';

const appRouter = express.Router();

appRouter.use('/auth', authRouter)

export default appRouter