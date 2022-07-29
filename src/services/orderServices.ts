import Order from '../models/orderModel';
import  IOrder  from '../interfaces/models/order';
import createHttpError from 'http-errors';
import User from '../models/userModel';
import blankChecklist from '../models/blankChecklist';
import {Types} from 'mongoose';


 export const createOrder = async (input : any, payload: {userId : string, role : string}) => {
    try {
        if(payload.role === 'client' || payload.role === 'inspection manager') {
            throw new createHttpError.Forbidden(`${payload.role} is not allowed to create checklist`)
        }

            // does client exist
            const client = await User.findById(input.clientId);
            if(!client ) {
                throw new createHttpError.NotFound(`${input.clientId} does not exist`)
            }
            // does client role is valid
            if(client.role !== 'client') {
                throw new createHttpError.NotAcceptable(`${input.clientId} is ${client.role}`)
            }
            
            // adding creator id
            input.createdBy = payload.userId;

            const orderDetails = await Order.create(input)
            return orderDetails
    } catch (error : any) {
       throw error
    }
}


export const addBlankChecklist = async (orderId : Types.ObjectId, checklistId : Types.ObjectId , payload : ({userId : string, role : string})) => {
    try {

        if(payload.role === 'client' || payload.role === 'inspection manager') {
            throw new createHttpError.Forbidden(`${payload.role} is not allowed to create checklist`)
        }

        if(!Types.ObjectId.isValid(orderId)){
            throw new createHttpError.NotFound(`Please provide a valid order id`)
        }

        if(!Types.ObjectId.isValid(checklistId)){
            throw new createHttpError.NotFound(`Please provide a valid checklist id`)
        }

            // validating order id
            const order = await Order.findById(orderId);
            if(!order ) {
                throw new createHttpError.NotFound(`${orderId} does not exist`)
            }
            // validating checklist id
           const checklist = await blankChecklist.findById(checklistId);
           if(!checklist) {
            throw new createHttpError.NotFound(`${checklistId} does not exist`)
           }

           if(order.clientId.toString() !== checklist.clientId.toString()) {
            throw new createHttpError.NotFound(`Can not link this checklist to client`)
           }

           const updateOrder = await Order.findByIdAndUpdate({_id :orderId}, {$set : {blankChecklistId : checklistId}}, {new : true})
           
           return updateOrder
        
    } catch (error : any) {
        throw error
    }
}