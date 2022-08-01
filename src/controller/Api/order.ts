import {createOrder, addBlankChecklist, getOrders, verifyOrder, updateStatus, getStatus} from '../../services/orderServices';
import { IRequest, IResponse, INext } from '../../interfaces/vendors/index';
import logger from '../../logger/logger';

/*
* @author Suraj Dubey
* @description Create a new order
* @route POST order/create
*/
export const createOrderHandler = async (req : any, res : IResponse, next : INext) => {
    try {
        const input = req.body;
        const payload = req.decoded;

        const order = await createOrder(input, payload);
        return res.status(201).send({status: true, message : "Order created successfully", orderDetails: order});
    } catch (error : any) {
        logger.info(error.message);
        next(error);
    }
}

/*
* @author Suraj Dubey
* @description Linking blank checklist
* @route PATCH order/link/checklist/:orderId/:checklistId
*/
export const linkBlankChecklistHandler = async (req : any, res : IResponse, next : INext) => {
    try {

        const orderId = req.params.orderId;
        const checklistId = req.params.checklistId;

        const updatedOrder = await addBlankChecklist(orderId, checklistId);
        return res.status(201).send({status: true, message : "Blank checklist updated successfully", data: updatedOrder});

    } catch (error : any) {
        logger.info(error.message); 
        next(error);
    }
}

/*
* @author Suraj Dubey
* @description Fetching order based on their status
* @route GET order/get
*/
export const getOrdersHandler = async (req : any, res : IResponse, next : INext) => {
    try {
        const status = req.query.status;
        const payload = req.decoded;

        const orders = await getOrders(status, payload);
        return res.status(200).send({status: true, number : orders.length , data : orders});
        
    } catch (error : any) {
        logger.info(error.message); 
        next(error);
    }
}

/*
* @author Suraj Dubey
* @description Verify order
* @route PATCH order/verify/:orderId
*/
export const orderVerificationHandler = async (req : any, res : IResponse, next : INext) => {
    try {
        const orderId = req.params.orderId;

        const order = await verifyOrder(orderId);

        if(typeof order === 'string') {
            return res.status(200).send({message : `${order}`})
        }

        return res.status(200).send({status: true, message : "order verified successfully" ,data : order})
        
    } catch (error : any) {
        logger.info(error.message);
        next(error);
    }
}

/*
* @author Suraj Dubey
* @description Update order status
* @route PATCH order/update/:orderId
*/
export const updateStatusHandler = async (req : any, res : IResponse, next : INext) => {
    try {
        const orderId = req.params.orderId;
        const status =  req.body.status;

        const update = await updateStatus(orderId, status);

        return res.status(200).send({status: true, message : "order status updated successfully", data : update});
        
    } catch (error : any) {
        logger.info(error.message);
        next(error);
    }
}

/*
* @author Suraj Dubey
* @description get order status
* @route GET order/get/:clientId
*/
export const getOrderStatusHandler = async (req : any, res : IResponse, next : INext) => {
    try {
        const clientId = req.params.clientId;
        const payload = req.decoded;

        const orders = await getStatus(clientId, payload);

        if(typeof orders === 'string') {
            return res.status(200).send({message : `${orders}`})
        }

        return res.status(200).send({status: true, data : orders})
        
    } catch (error : any) {
        next(error);
    }
}