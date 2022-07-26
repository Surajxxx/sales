import {  IResponse, INext } from "../../interfaces/vendors";
import { loginUser } from "../../services/userServices";
import logger from "../../logger/logger";

export const loginHandler = async (req: any, res: any, next: INext): Promise<void> => {

    try {
        const login = await loginUser(req.body);

        if(login.token !== undefined && login.user !== undefined) {
            return res.status(200).send({token: login.token, user: login.user})
        }
       
        
    } catch (error : any) {
        logger.info(error.message);
        console.log("error0", error);
        if(error.status === 404) {
            return res.status(406).json({status: 'Bad Request', message: error.message});
        }
        next(error);
    }

}