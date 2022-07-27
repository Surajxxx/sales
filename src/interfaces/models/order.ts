import {Types} from 'mongoose'


interface IOrder {
    clientId: Types.ObjectId;
    status : string;
    createdBy: Types.ObjectId;
    checkListId: Types.ObjectId;
    items: number;
    deliveryAt : string;
    
}

export default IOrder;