import express from 'express'
import authRouter from './authRouter.js';
import groupRouter from './groupRouter.js';
import messageRouter from './messageRouter.js';

const appRouter = express.Router();

appRouter.use('/auth', authRouter)
appRouter.use('/group', groupRouter)
appRouter.use('/message', messageRouter);



export default appRouter