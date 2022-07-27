import CheckList from '../models/checklistModel';
import User from '../models/userModel'
import createHttpError from 'http-errors';
import logger from '../logger/logger';



export const createChecklist = async (input : any, payload : {userId : string, role : string}) => {
    try {
        if(payload.role === 'client' || payload.role === 'inspection manager') {
            throw new createHttpError.Forbidden(`${payload.role} is not allowed to create checklist`)
        }

        // does client exist
        const client = await User.findById(input.clientId);
        if(!client ) {
            throw new createHttpError.NotFound(`${input.clientId} does not exist`)
        }
        // does client role is valid
        if(client.role !== 'client') {
            throw new createHttpError.NotAcceptable(`${input.clientId} is ${client.role}`)
        }

        // adding creator ID
        input.createdBy = payload.userId

        const checklist = await CheckList.create(input);

        return checklist;
        
    } catch (error : any) {
        throw error
    }
}