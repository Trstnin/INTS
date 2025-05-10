import express from 'express'
import authRouter from './authRouter.js';
import groupRouter from './groupRouter.js';


const appRouter = express.Router();

appRouter.use('/auth', authRouter)
appRouter.use('/group', groupRouter)




export default appRouter