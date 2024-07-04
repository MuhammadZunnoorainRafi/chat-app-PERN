import express from 'express';
import {
  userLogController,
  userRegController,
  verifyTokenController,
} from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware';

const userRoute = express.Router();

userRoute.post('/register', userRegController);
userRoute.post('/login', userLogController);
userRoute.get('/validate-token', protect, verifyTokenController);

export default userRoute;
