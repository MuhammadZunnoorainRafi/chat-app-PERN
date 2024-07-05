import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import {
  getMessageController,
  getUsersForSidebarController,
  sendMessageController,
} from '../controllers/messageController';

const messageRoute = express.Router();

messageRoute.get('/conservation', protect, getUsersForSidebarController);
messageRoute.get('/:id', protect, getMessageController);
messageRoute.post('/send/:id', protect, sendMessageController);

export default messageRoute;
