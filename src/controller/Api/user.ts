import { IRequest, IResponse, INext } from '../../interfaces/vendors/index';
import logger from '../../logger/logger';
import {getUserByRole} from '../../services/userServices';

/*
* @author Suraj Dubey
* @description get users by role
* @route GET /user/get
*/

export const getUserByRoleHandler = async (req : any, res : IResponse, next : INext) => {
    try {
        const role = req.query.role;

        const users = await getUserByRole(role);

        return res.status(200).send({status: 'true', numbers : users.length, data : users});
        
    } catch (error : any) {
        next(error);
    }
}