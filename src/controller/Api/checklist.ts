import {  IResponse, INext } from "../../interfaces/vendors";
import logger from "../../logger/logger";
import {createChecklist} from '../../services/checklistServices'



export const registerChecklist = async (req: any, res: IResponse, next : INext) => {

    try {
        const payload = req.decoded;
        const input = req.body;
        
        const data = await createChecklist(input, payload)

        return res.status(201).json(data);
        
    } catch (error : any) {
        next(error);
    }   
}
