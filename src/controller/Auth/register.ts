import { IResponse, INext } from "../../interfaces/vendors";
import { createUser } from "../../services/userServices";
import logger from "../../logger/logger";
import mongoose from "mongoose";

/*
* @author Suraj Dubey
* @description User registration 
* @route POST user/register
*/


export const registerUserHandler = async (req : any, res : IResponse, next : INext) : Promise<any> => {
    try {
        const creator = req.decoded.role
        const creatorId = req.decoded.userId;

        const user = await createUser(req.body, creator, creatorId);
    
        return res.status(201).send({status: 'success', data: user});


    } catch (error : any) {
        logger.info(error.message);
        if(error.status === 406) {
            return res.status(406).json({status: 'Bad Request', message: error.message});
        }
        if(error instanceof mongoose.Error.ValidationError){
           return res.status(400).send({message : error.message});
        }
        next(error);
    }

}
