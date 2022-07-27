import { Schema, model, Model, Document } from "mongoose";
import IOrder from '../interfaces/models/order'

const ObjectId = Schema.Types.ObjectId;

const orderSchema : Schema = new Schema({
    clientId: {type : ObjectId, required: true, ref : "User"},
    status : {type : String, required: true, enum : ["pending", "inTransit", "completed", "cancelled"]},
    createdBy : {type : ObjectId, required: true, ref : "User"},
    checkListId : {type : ObjectId, required: true, ref : "CheckList"},
    items : {type : Number, required: true},
    deliveryAt : {type : String, required: true}
}, {timestamps : true})

export const Order = model<IOrder>("Order", orderSchema)