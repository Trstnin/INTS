import express from 'express';
import { getGroupMessages, sendMessage } from '../controllers/messageController.js';
import authUser from '../middlewares/authMiddleware.js';

const messageRouter = express.Router();

messageRouter.post("/",authUser ,sendMessage);
messageRouter.get("/:groupId",authUser ,getGroupMessages);


export default messageRouter;