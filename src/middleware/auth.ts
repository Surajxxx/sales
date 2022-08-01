import { IRequest, IResponse, INext } from "../interfaces/vendors";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import Locals from "../config/config";
import logger from "../logger/logger";
import { Types } from 'mongoose';

type payload = { userId: Types.ObjectId, role: string }

/*
* @author Suraj Dubey
* @description AuthMiddleware 
*/

export const authentication = async (req: any, res: IResponse, next: INext) => {

    try {

        let token = req.headers["authorization"];

        if (!token || token.split(" ")[0] !== 'Bearer') {
            throw new createHttpError.Unauthorized("Token is required...please login first.");
        }

        token = token.split(" ")[1];

        const decoded = await jwt.verify(token, Locals.config().jwtSecret);

        req.decoded = decoded

        next()

    } catch (error: any) {
        logger.info(error.message);
        next(error)
    }

}

/*
* @author Suraj Dubey
* @description Role management service
*/

export const allowedRoles = (role: any) => {
    return async (req : any, res: IResponse, next : INext) => {
            const inputRole = req.decoded.role;
            if(!role.includes(inputRole)){
                return res.status(403).send({message: `${inputRole} is not authorized for this resource`});
            }

          return next()  
    }
    
}


