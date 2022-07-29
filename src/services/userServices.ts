import User from '../models/userModel';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import {IUserModel} from '../models/userModel'
import logger from '../logger/logger';
import bcrypt from 'bcrypt';
import { HydratedDocument } from 'mongoose'




export const canCreateUser = (inputRole : string, creatorRole : string) => {
    if(creatorRole === "admin") {
        return true
    }
    
    if(creatorRole === 'client' || creatorRole === 'inspection manager') {
        return false
    }

    if(creatorRole === "product manager") {
        if(inputRole === "client" || inputRole === "inspection manager") {
            return true
        }
        return false
    }

}


export const createUser = async (input: any, creator : string, creatorId : string) => {
    try {

        if(!canCreateUser(input.role, creator)){
            throw new createHttpError.Forbidden(`${creator} are not allowed to create ${input.role}`)
        }

        // verify email and phone number are unique
        const isEmailExist = await User.findOne({ email: input.email });

        if(isEmailExist){
          throw new createHttpError.NotAcceptable('Email already exists');
        }
        const isPhoneNumberExist = await User.findOne({ phone: input.phone });

        if(isPhoneNumberExist){
            throw new createHttpError.NotAcceptable('Phone number already exists');
        }

        // adding creator field
        input.creator = creatorId;

        // assigning reporting manager

        // if(creator === 'admin' && input.reportingManager === undefined){

        // }



        const user : any = await User.create(input)

        // masking password 
        user.password = undefined;

        return user
    } catch (error : any) {
        logger.info(error.message)
      throw error
    }
}


export const loginUser = async (input: any) : Promise<any> => {


    try {

        const condition : {phone ?: string, email ?: string} = {}

        if(input.role === "inspection manager"){
            if(input.phone === undefined){
                throw new createHttpError.NotAcceptable("Inspection manager login, requires phone number");
            }
            condition.phone = input.phone;
        }else{
            if(input.email === undefined){
                throw new createHttpError.BadRequest(`${input.role}, login requires Email`)
            }
            condition.email = input.email;
        }
        
        const user : any = await User.findOne(condition);

        if(!user){
            throw new createHttpError.NotFound(`${Object.keys(condition)[0]} does not exist`);
        }

        if(user.role !== input.role){
            throw new createHttpError.Unauthorized(`Please login as ${user.role}`);
        }

        const isPasswordMatch = await bcrypt.compare(input.password, user.password);

        if(!isPasswordMatch){
            throw new createHttpError.NotAcceptable('Invalid Password')
        }

            const payload = {
                userId : user._id.toString(),
                role : user.role
            }
    
            const secret : any = process.env.JWT_SECRET
            const expiry = {expiresIn : "3600s"}
    
            const token = jwt.sign(payload, secret, expiry)
            
            // masking user password and role
            user.password = undefined;
            user.role = undefined;
             const obj =   {token: token, user : user}
             return obj

    } catch (error : any) {
        logger.info(error.message)
        throw error
    }
    
}

