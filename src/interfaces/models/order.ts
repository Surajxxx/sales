import {Types} from 'mongoose'

/*
* @author Suraj Dubey
* @description interface for creating Orders
*/
interface IOrder {
    clientId: Types.ObjectId;
    status : string;
    createdBy: Types.ObjectId;
    blankChecklistId ?: Types.ObjectId;
    items: number;
    deliveryAt : string;
    itemsType : string;
    coolerRequired : boolean;
    paddingRequired : boolean;
    waterProtectionRequired : boolean;
    palletsRequired : boolean;
    sharingAllowed : boolean;
    pickFrom : string;
    itemDetails : string;
    isVerified : boolean;
    filledChecklistId : Types.ObjectId;
}

export default IOrder;