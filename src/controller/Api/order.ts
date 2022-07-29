import {createOrder, addBlankChecklist} from '../../services/orderServices';
import { IRequest, IResponse, INext } from '../../interfaces/vendors/index';


export const createOrderHandler = async (req : any, res : IResponse, next : INext) => {
    try {
        const input = req.body;
        const payload = req.decoded;

        const order = await createOrder(input, payload);
        return res.status(201).send({status: true, message : "Order created successfully", orderDetails: order});
    } catch (error : any) {
        next(error);
    }
}

export const linkBlankChecklistHandler = async (req : any, res : IResponse, next : INext) => {
    try {

        const payload = req.decoded;
        const orderId = req.params.orderId;
        const checklistId = req.params.checklistId;

        const updatedOrder = await addBlankChecklist(orderId, checklistId, payload);
        return res.status(201).send({status: true, message : "Blank checklist updated successfully", data: updatedOrder});
                
    } catch (error : any) {
        next(error);
    }
}