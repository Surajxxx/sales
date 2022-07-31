import {  IResponse, INext } from "../../interfaces/vendors";
import logger from "../../logger/logger";
import {createBlankChecklist, getChecklist} from '../../services/blankChecklistServices';



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
