import express from 'express'
import authRouter from './authRouter.js';
import groupRouter from './groupRouter.js';
import messageRouter from './messageRouter.js';
import aiRouter from './aiRouter.js';

const appRouter = express.Router();

appRouter.use('/auth', authRouter)
appRouter.use('/group', groupRouter)
appRouter.use('/message', messageRouter);
appRouter.use('/aiValidate', aiRouter);



export default appRouter