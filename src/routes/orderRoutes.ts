import express from 'express';
import * as AuthMiddleware from '../middleware/auth';
import * as OrderController from '../controller/Api/order';
import {createOrderSchema, updateOrderStatusSchema} from '../middleware/validateRequest'


const router = express.Router();

// create order
router.post('/create', createOrderSchema, AuthMiddleware.authentication, AuthMiddleware.allowedRoles(['admin','product manager']), OrderController.createOrderHandler )

// link blankChecklist
router.put('/link/checklist/:orderId/:checklistId', AuthMiddleware.authentication, AuthMiddleware.allowedRoles(['admin','product manager']), OrderController.linkBlankChecklistHandler)

// list of orders
router.get('/get', AuthMiddleware.authentication, AuthMiddleware.allowedRoles(['admin','product manager', 'inspection manager']), OrderController.getOrdersHandler)

// verify order
router.patch('/verify/:orderId', AuthMiddleware.authentication, AuthMiddleware.allowedRoles(['admin','product manager']),  OrderController.orderVerificationHandler)

// update order status
router.patch('/update/:orderId', updateOrderStatusSchema, AuthMiddleware.authentication, AuthMiddleware.allowedRoles(['admin','product manager']), OrderController.updateStatusHandler)



export default router;

