import express from 'express';
import * as AuthMiddleware from '../middleware/auth';
import { createBlankChecklistSchema, createFilledChecklistSchema } from '../middleware/validateRequest';
import * as BlankChecklistController from '../controller/Api/blankChecklist';
import * as FilledChecklistController from '../controller/Api/filledChecklist';

const router = express.Router();

// Create  blank checklist
router.post('/register/blank', createBlankChecklistSchema, AuthMiddleware.authentication, AuthMiddleware.allowedRoles(['admin','product manager']), BlankChecklistController.registerChecklistHandler)

// get blank checklist by clientId
router.get('/get/blank/:clientId', AuthMiddleware.authentication, AuthMiddleware.allowedRoles(['admin','product manager']) ,BlankChecklistController.getChecklistByClientIdHandler)

// create filled checklist
router.post('/register/fill/:orderId', createFilledChecklistSchema, AuthMiddleware.authentication, AuthMiddleware.allowedRoles(['inspection manager']), FilledChecklistController.fillChecklistHandler)

export default router