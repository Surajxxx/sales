import { IResponse, INext } from "../../interfaces/vendors";
import { createUser } from "../../services/userServices";
import logger from "../../logger/logger";




export const registerUserHandler = async (req : any, res : IResponse, next : INext) : Promise<any> => {
    try {

        const user = await createUser(req.body);
    
        return res.status(201).send({status: 'success', data: user});


    } catch (error : any) {
        logger.info(error.message);
        if(error.status === 406) {
            return res.status(406).json({status: 'Bad Request', message: error.message});
        }
        next(error);
}

}
