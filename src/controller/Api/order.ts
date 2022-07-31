import {createOrder, addBlankChecklist, getOrders, verifyOrder, updateStatus} from '../../services/orderServices';
import { IRequest, IResponse, INext } from '../../interfaces/vendors/index';
import logger from '../../logger/logger';


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

export const getOrdersHandler = async (req : any, res : IResponse, next : INext) => {
    try {
        const status = req.query.status;

        const orders = await getOrders(status);
        return res.status(200).send({status: true, number : orders.length , data : orders});
        
    } catch (error : any) {
        logger.info(error.message); 
        next(error);
    }
}

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