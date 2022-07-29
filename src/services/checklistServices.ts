import blankChecklist from '../models/blankChecklist';
import User from '../models/userModel'
import createHttpError from 'http-errors';
import logger from '../logger/logger';
import { Types } from 'mongoose';



export const createBlankChecklist = async (input : any, payload : {userId : string, role : string}) => {
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
        // input requirements present
        if(input.requirements === undefined || Object.keys(input.requirements).length === 0) {
            throw new createHttpError.BadRequest(`Requirements can not be empty`)
        }

        // adding creator ID
        input.createdBy = payload.userId

        const checklist = await blankChecklist.create(input);

        return checklist;
        
    } catch (error : any) {
        throw error
    }
}

export const getChecklist = async(input: Types.ObjectId, payload : ({userId : string, role : string}) ) => {

    try {
        if(payload.role === 'client' || payload.role === 'inspection manager') {
            throw new createHttpError.Forbidden(`${payload.role} is not allowed to create checklist`)
        }

            // does client exist
            const client = await User.findById(input);
            if(!client ) {
                throw new createHttpError.NotFound(`${input} does not exist`)
            }
            // does client role is valid
            if(client.role !== 'client') {
                throw new createHttpError.NotAcceptable(`${input} is ${client.role}`)
            }

            const checklists = await blankChecklist.find({clientId : input});

            if(checklists.length === 0) {
                throw new createHttpError.NotFound(`Checklist not found for ${input}`)
            }

            return checklists

    } catch (error : any) {
        throw error
    }
}