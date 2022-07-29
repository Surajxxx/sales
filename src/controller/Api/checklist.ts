import {  IResponse, INext } from "../../interfaces/vendors";
import logger from "../../logger/logger";
import {createBlankChecklist, getChecklist} from '../../services/checklistServices';
import {Types} from 'mongoose';
import createHttpError from "http-errors";


export const registerChecklist = async (req: any, res: IResponse, next : INext) => {

    try {
        const payload = req.decoded;
        const input = req.body;
        
        const data = await createBlankChecklist(input, payload)

        return res.status(201).json(data);
        
    } catch (error : any) {
        next(error);
    }   
}

export const getChecklistByClientId = async (req: any, res: IResponse, next : INext) => {
    try {
        const payload = req.decoded;
        const clientId = req.params.clientId;

        if(!Types.ObjectId.isValid(clientId)){
            throw new createHttpError.BadRequest("Please provide a valid clientId")
        }

        const data = await getChecklist(clientId, payload);

        return res.status(200).send({status: true, numbers : data.length, data: data});
        
    } catch (error : any) {
        next(error);
    }
}
