import express from 'express';
import authUser from '../middlewares/authMiddleware.js';
import {newlyJoinedGroup, getJoinedGroup, leaveJoinedGroup} from '../controllers/joinedGroupController.js';

const groupRouter = express.Router();


groupRouter.post('/join-group',newlyJoinedGroup)
groupRouter.get('/join-group',getJoinedGroup)
groupRouter.post('/leave-group',leaveJoinedGroup)


export default groupRouter