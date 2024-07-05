import express from 'express';
import {
  logoutController,
  userLogController,
  userRegController,
  verifyTokenController,
} from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware';

const userRoute = express.Router();

userRoute.post('/register', userRegController);
userRoute.post('/login', userLogController);
userRoute.get('/validate-token', protect, verifyTokenController);
userRoute.post('/logout', logoutController);

export default userRoute;
