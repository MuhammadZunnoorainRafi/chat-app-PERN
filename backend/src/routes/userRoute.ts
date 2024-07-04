import express from 'express';
import { userRegController } from '../controllers/userController';

const userRoute = express.Router();

userRoute.post('/register', userRegController);

export default userRoute;
