import { Schema, model, Types} from 'mongoose';
import {IFilledChecklist} from '../interfaces/models/checklist';

/*
* @author Suraj Dubey
* @description FilledChecklist schema and model
*/

const ObjectId = Types.ObjectId;

const filledChecklistSchema = new Schema({
    orderId : {type : ObjectId, ref : "Order"},
    inspectedBy : {type : ObjectId, ref : "User"},
    requirements : {
    cooler : {type : Boolean},
    padding : {type : Boolean},
    compartment : {type : Boolean},
    pallets : {type : Boolean},
    waterProtection : {type : Boolean}
    },
    category : {type : String},
    driverDetails : {
        licensePresent : {type : Boolean},
        rc : {type : Boolean},
        phone : {type : Boolean},
        airPressureGood : {type : Boolean}    
    },
    halfLoadingImage : {type : String},
    fullLoadingImage : {type : String},
    summary : {type : String}
}, {timestamps : true})

// creating model
 const FilledChecklist = model<IFilledChecklist>("FilledChecklist", filledChecklistSchema)

 export default FilledChecklist