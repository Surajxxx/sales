import express from 'express';
import { createUserSchema, loginSchema } from '../middleware/validateRequest';
import * as UserController from '../controller/Auth/register';
import * as AuthController from '../controller/Auth/login-logout';
import * as AuthMiddleware from '../middleware/auth'

const router = express.Router();

// Register, it should be protected
router.post('/register', createUserSchema, AuthMiddleware.authentication, UserController.registerUserHandler);

// Login
router.post('/login', loginSchema, AuthController.loginHandler);

// Logout
router.get('/logout', AuthController.logoutHandler);

export default router