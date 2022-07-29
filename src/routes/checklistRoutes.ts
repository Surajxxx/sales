import express from 'express';
import * as AuthMiddleware from '../middleware/auth';
import { createBlankChecklistSchema } from '../middleware/validateRequest';
import * as ChecklistController from '../controller/Api/checklist'

const router = express.Router();


router.post('/register', createBlankChecklistSchema, AuthMiddleware.authentication, ChecklistController.registerChecklist)

router.get('/getChecklist/:clientId',AuthMiddleware.authentication, ChecklistController.getChecklistByClientId)

export default router