import BlankChecklist from '../models/blankChecklist';
import User from '../models/userModel'
import createHttpError from 'http-errors';
import logger from '../logger/logger';
import { Types } from 'mongoose';


/*
* @author Suraj Dubey
* @description Service for creating new blank checklist
*/

type payload = {userId : Types.ObjectId, role : string}

export const createBlankChecklist = async (input: any, payload: payload) => {
    try {
    
        // does client exist
        const client = await User.findById(input.clientId);
        if (!client) {
            throw new createHttpError.NotFound(`${input.clientId} does not exist`)
        }
        // does client role is valid
        if (client.role !== 'client') {
            throw new createHttpError.NotAcceptable(`${input.clientId} is ${client.role}`)
        }
        // input requirements present
        if (input.requirements === undefined || Object.keys(input.requirements).length === 0) {
            throw new createHttpError.BadRequest(`Requirements can not be empty`)
        }

        // adding creator ID
        input.createdBy = payload.userId

        const checklist = await BlankChecklist.create(input);

        return checklist;

    } catch (error: any) {
        throw error
    }
}

/*
* @author Suraj Dubey
* @description Service for fetching all blank checklist
*/
export const getChecklist = async (input: Types.ObjectId) => {

    try {

        if (!Types.ObjectId.isValid(input)) {
            throw new createHttpError.BadRequest("Please provide a valid clientId")
        }

        // does client exist
        const client = await User.findById(input);
        if (!client) {
            throw new createHttpError.NotFound(`${input} does not exist`)
        }
        // does client role is valid
        if (client.role !== 'client') {
            throw new createHttpError.NotAcceptable(`${input} is ${client.role}`)
        }

        const checklists = await BlankChecklist.find({ clientId: input });

        if (checklists.length === 0) {
            throw new createHttpError.NotFound(`Checklist not found for ${input}`)
        }

        return checklists

    } catch (error: any) {
        throw error
    }
}