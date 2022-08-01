import { Schema, model, Model, Document } from "mongoose";
import IOrder from '../interfaces/models/order'

/*
* @author Suraj Dubey
* @description Order schema and model
*/

const ObjectId = Schema.Types.ObjectId;

const orderSchema : Schema = new Schema({
    clientId: {type : ObjectId, ref : "User"},
    createdBy : {type : ObjectId, ref : "User"},
    status : {type : String},
    blankChecklistId : {type : ObjectId, ref : "BlankChecklist"},
    filledChecklistId : {type : ObjectId, ref : "FilledChecklist"},
    items : {type : Number, required: true},
    itemType : {type : String, required: true},
    itemDetails : {type : String, required: true},
    coolerRequired : {type : Boolean, default: false},
    paddingRequired : {type : Boolean, default: false},
    waterProtectionRequired : {type : Boolean, default: false},
    palletsRequired : {type : Boolean, default: false},
    sharingAllowed : {type : Boolean, default : false},
    deliveryTo : {type : String, required: true},
    pickUpFrom : {type : String, required: true},
    isVerified : {type : Boolean, default: false}

}, {timestamps : true})

// creating model
 const Order = model<IOrder>("Order", orderSchema);

 export default Order;