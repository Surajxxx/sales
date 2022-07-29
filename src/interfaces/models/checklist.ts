import {Types} from 'mongoose'

type Driver = {
    licensePresent ?: boolean,
    phone ?: boolean,
    rc ?: boolean 
}

type Requirements = {
    cooler?: boolean,
    padding ?: boolean,
    compartment ?: boolean,
    pallets ?: boolean,
    waterProtection ?: boolean
}

interface IBlankChecklist {
    clientId: Types.ObjectId;
    createdBy: Types.ObjectId;
    requirements: Requirements;
    category : string;
    driverDetails: Driver;
    summary: string;

}

export default IBlankChecklist;