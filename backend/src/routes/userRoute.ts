import express from 'express';
import {
  userLogController,
  userRegController,
} from '../controllers/userController';

const userRoute = express.Router();

userRoute.post('/register', userRegController);
userRoute.post('/login', userLogController);

export default userRoute;
