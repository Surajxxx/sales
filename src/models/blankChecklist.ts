import { Schema, model, Types } from "mongoose";
import {IBlankChecklist} from '../interfaces/models/checklist';

/*
* @author Suraj Dubey
* @description BlankChecklist schema and model
*/

const ObjectId = Schema.Types.ObjectId;

const blankChecklistSchema : Schema = new Schema({
    clientId: {type : ObjectId,  ref : "User"},
    createdBy : {type : ObjectId, ref : "User"},
    requirements : {
        cooler : {type : Boolean},
        padding : {type : Boolean},
        compartment : {type : Boolean},
        pallets : {type : Boolean},
        waterProtection : {type : Boolean},
    },
    category : {type : String},
    driverDetails : {
        licensePresent : {type : Boolean},
        rc : {type : Boolean},
        phone : {type : Boolean},
        airPressureGood : {type : Boolean},
    },
    summary : {type : String}
}, {timestamps : true})


// creating model
 const BlankChecklist = model<IBlankChecklist>("BlankChecklist", blankChecklistSchema)

 export default BlankChecklist;