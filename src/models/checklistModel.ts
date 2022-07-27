import { Schema, model } from "mongoose";
import IChecklist from '../interfaces/models/checklist';


const ObjectId = Schema.Types.ObjectId;

const checklistSchema : Schema = new Schema({
    clientId: {type : ObjectId, required: true, ref : "User"},
    createdBy : {type : ObjectId, required: true, ref : "User"},
    isVerified : {type : Boolean, default: false},
    coolerPresent : {type : Boolean, required: true},
    category : {type : String, required: true,enum : ["food", "medical", "houseHolds"]},
    driverDetails : {
        licensePresent : {type : Boolean},
        rc : {type : Boolean},
        phone : {type : Boolean}
    }
}, {timestamps : true})

 const Checklist = model<IChecklist>("CheckList", checklistSchema)

 export default Checklist;