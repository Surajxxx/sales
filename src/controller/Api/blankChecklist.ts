import {  IResponse, INext } from "../../interfaces/vendors";
import logger from "../../logger/logger";
import {createBlankChecklist, getChecklist} from '../../services/blankChecklistServices';


/*
* @author suraj dubey
* @description Create blank checklist 
* @route POST checklist/register/blank
*/
export const registerChecklistHandler = async (req: any, res: IResponse, next : INext) => {

    try {
        const payload = req.decoded;
        const input = req.body;
        
        const data = await createBlankChecklist(input, payload)

        return res.status(201).json(data);
        
    } catch (error : any) {
        logger.info(error.message);
        next(error);
    }   
}

/*
* @author Suraj Dubey
* @description Registering filled checklist
* @route GET checklist/get/blank/:clientId
*/
export const getChecklistByClientIdHandler = async (req: any, res: IResponse, next : INext) => {
    try {
    
        const clientId = req.params.clientId;

        const data = await getChecklist(clientId);

        return res.status(200).send({status: true, numbers : data.length, data: data});
        
    } catch (error : any) {
        logger.info(error.message);
        next(error);
    }
}
