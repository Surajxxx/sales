import express from 'express';
import { createUserSchema, loginSchema } from '../middleware/validateRequest';
import * as SignUpController from '../controller/Auth/register';
import * as AuthController from '../controller/Auth/login-logout';
import * as AuthMiddleware from '../middleware/auth';
import * as UserController from '../controller/Api/user';

const router = express.Router();

// Register, it should be protected
router.post('/register', createUserSchema, AuthMiddleware.authentication, SignUpController.registerUserHandler);

// Login
router.post('/login', loginSchema, AuthController.loginHandler);

// Get users
router.get('/get', AuthMiddleware.authentication, AuthMiddleware.allowedRoles(['admin']), UserController.getUserByRoleHandler);

// Logout
router.get('/logout', AuthController.logoutHandler);

export default router