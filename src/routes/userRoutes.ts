import express from 'express';
import { createUserSchema, loginSchema } from '../middleware/validateRequest';
import * as UserController from '../controller/Auth/register';
import * as AuthController from '../controller/Auth/login';

const router = express.Router();

// Register
router.post('/register', createUserSchema, UserController.registerUserHandler);

router.post('/login', loginSchema, AuthController.loginHandler);

export default router