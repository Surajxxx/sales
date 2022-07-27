import {  IResponse, INext } from "../../interfaces/vendors";
import { loginUser } from "../../services/userServices";
import logger from "../../logger/logger";

export const loginHandler = async (req: any, res: any, next: INext): Promise<void> => {

    try {
        const login = await loginUser(req.body);

            req.session.user = login.user;

            res.header('Authorization', 'Bearer ' + login.token)

            return res.status(200).send({token: login.token, user: login.user})
       
    } catch (error : any) {
        logger.info(error.message);
        next(error);
    }

}

export const logoutHandler =  async (req : any, res : IResponse, next : INext) => {
    req.session.destroy((err : Error) => {
        if(err) {
            throw new Error(err.message);
        }
    });
   return res.clearCookie("connect.sid").end("logout success");
}