import express from 'express';
import * as AuthMiddleware from '../middleware/auth';
import { createChecklistSchema } from '../middleware/validateRequest';
import * as ChecklistController from '../controller/Api/checklist'

const router = express.Router();


router.post('/register', createChecklistSchema, AuthMiddleware.authentication, ChecklistController.registerChecklist)


export default router