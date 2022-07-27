import {Types} from 'mongoose'

type Driver = {
    licensePresent ?: boolean,
    phone ?: boolean,
    rc ?: boolean 
}

interface IChecklist {
    clientId: Types.ObjectId;
    createdBy: Types.ObjectId;
    coolerPresent: boolean;
    category : string;
    driverDetails: Driver;
    isVerified : boolean;

}

export default IChecklist;