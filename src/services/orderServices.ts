import Order from '../models/orderModel';
import  IOrder  from '../interfaces/models/order';
import createHttpError from 'http-errors';
import User from '../models/userModel';
import BlankChecklist from '../models/blankChecklist';
import {Types} from 'mongoose';

type payload = {userId : Types.ObjectId, role : string}


 export const createOrder = async (input : any, payload: payload) => {
    try {

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


export const addBlankChecklist = async (orderId : Types.ObjectId, checklistId : Types.ObjectId ) => {
    try {

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
           const checklist = await BlankChecklist.findById(checklistId);
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

export const getOrders = async (input : string) => {
    try {

       if(!["pending", "completed", "dispatched", "confirmed"].includes(input)){
        throw new createHttpError.BadRequest(`${input} is not allowed here`)
       }
       const condition = {status : input};

       const orders = await Order.find(condition).populate("filledChecklistId");

       return orders;
        
    } catch (error : any) {
        throw error;
    }
}

export const verification =  (order : any) => {
    const {itemType, coolerRequired, paddingRequired, waterProtectionRequired, palletsRequired, sharingAllowed, filledChecklistId} = order 
    const {driverDetails, requirements, category} = filledChecklistId
    const {cooler, padding, compartment, pallets, waterProtection} = requirements;

    // category should be same as itemType
    if(itemType !== category){
        return false;
    }

    // checking all driver details are ok
    for(let key in driverDetails){
        if(driverDetails[key] === false){
            return false;
        }
    }

    // matching all requirements
    if(coolerRequired !== cooler || paddingRequired !== padding || waterProtectionRequired !== waterProtection || sharingAllowed !== compartment || palletsRequired !== pallets){
        return false;
    }

    return true;
}

export const verifyOrder = async (input : Types.ObjectId) => {
        try {

            if(!Types.ObjectId.isValid(input)){
                throw new createHttpError.NotFound(`Please provide a valid order id`)
            }

            const order : any = await Order.findById(input).populate("filledChecklistId");

            if(!order){
                throw new createHttpError.NotFound(`${input} does not exist`)
            }

            // matching the requirements and filledChecklist
           if(!verification(order)){
                return ("some fields are not matching with order requirements");
           }

           // update isVerified and status in order

           const updateVerification = await Order.findByIdAndUpdate({_id : input}, {$set : {isVerified : true, status : "confirmed"}}, {new : true});
           return updateVerification

        } catch (error : any) {
            throw error;
        }
}

export const updateStatus = async (input : Types.ObjectId, status : string) => {
    try {

        if(!Types.ObjectId.isValid(input)){
            throw new createHttpError.NotFound(`Please provide a valid order id`)
        }

        const order : any = await Order.findById(input)

        if(!order){
            throw new createHttpError.NotFound(`${input} does not exist`)
        }

        if(order.status === "completed"){
            throw new createHttpError.NotAcceptable(`can not update completed order`)
        }

        if(order.status === "confirmed" && status === "completed"){
            throw new createHttpError.NotAcceptable(`can not update status as completed as order has not been dispatched`)
        }
        
        if(order.status === status){
            throw new createHttpError.NotAcceptable(`order status is already ${status}`)
        }


        const updatedOrder = await Order.findByIdAndUpdate({_id : input}, {$set : {status : status}}, {new : true});
        return updatedOrder

    } catch (error : any) {
        throw error;
    }
}

