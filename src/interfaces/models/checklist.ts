import {Types} from 'mongoose'

/*
* @author Suraj Dubey
* @description interface for creating Filled and Blank checklist
*/

type Driver = {
    licensePresent ?: boolean,
    phone ?: boolean,
    rc ?: boolean,
    airPressureGood ?: boolean
}

type Requirements = {
    cooler?: boolean,
    padding ?: boolean,
    compartment ?: boolean,
    pallets ?: boolean,
    waterProtection ?: boolean
}

export interface IBlankChecklist {
    clientId: Types.ObjectId;
    createdBy: Types.ObjectId;
    requirements: Requirements;
    category : string;
    driverDetails: Driver;
    summary: string;

}

export interface IFilledChecklist {
    orderID : Types.ObjectId;
    inspectedBy : Types.ObjectId;
    requirements: Requirements;
    driverDetails: Driver;
    summary: string;
    category: string;
    halfLoadingImage : string;
    fullLoadingImage : string;
}

