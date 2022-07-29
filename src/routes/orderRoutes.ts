import express from 'express';
import * as AuthMiddleware from '../middleware/auth';
import * as OrderController from '../controller/Api/order';
import {createOrderSchema} from '../middleware/validateRequest'

const router = express.Router();


router.post('/create', createOrderSchema, AuthMiddleware.authentication, OrderController.createOrderHandler )

router.put('/linkBlankChecklist/:orderId/:checklistId', AuthMiddleware.authentication, OrderController.linkBlankChecklistHandler)
export default router;

