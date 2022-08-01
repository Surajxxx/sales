import User from '../models/userModel';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import logger from '../logger/logger';
import bcrypt from 'bcrypt';
import {Types} from 'mongoose';


/*
* @author Suraj Dubey
* @description  checking whether logged in user can create a new user
*/
const canCreateUser = (inputRole : string, creatorRole : string) => {
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

/*
* @author Suraj Dubey
* @description Service for creating new users
*/
export const createUser = async (input: any, creatorRole : string, creatorId : Types.ObjectId) => {
    try {

        if(!canCreateUser(input.role, creatorRole)){
            throw new createHttpError.Forbidden(`${creatorRole} are not allowed to create ${input.role}`)
        }

        // adding creator field
        input.createdBy = creatorId;

        if (input.reportingManager) {

            const reportingManager = await User.findById(input.reportingManager);
            
            if (!reportingManager) {
                throw new createHttpError.NotFound(`No user exits with ${input.reportingManager} ID`);
            }

            if (reportingManager.role !== "product manager"){
                throw new createHttpError.NotAcceptable(`${input.role} can not be assigned to ${reportingManager.role}`);
            }

            if(creatorRole === "product manager" && reportingManager._id.toString() !== input.reportingManager){
                throw new createHttpError.Forbidden(`Can only assign your self as reportingManager`)
            }
                
        }

        if(creatorRole === 'admin' && input.role === 'inspection manager'){
            if(input.reportingManager === undefined){
                input.reportingManager = creatorId
            }
        }

        const user : any = await User.create(input)

        // masking password 
        user.password = undefined;

        return user
    } catch (error : any) {
      throw error
    }
}

/*
* @author Suraj Dubey
* @description Service for login
*/
export const loginUser = async (input: any) : Promise<any> => {

    try {
        // login can happen with phone or email
        const condition : {phone ?: string, email ?: string} = {}

        // inspection manager can only login with phone number
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
        // comparing password
        const isPasswordMatch = await bcrypt.compare(input.password, user.password);

        if(!isPasswordMatch){
            throw new createHttpError.NotAcceptable('Invalid Password')
        }

        // JWT logic
            const payload = {
                userId : user._id.toString(),
                role : user.role
            }
    
            const secret : any = process.env.JWT_SECRET
            const expiry = {expiresIn : "9000s"}
    
            const token = jwt.sign(payload, secret, expiry)
            
            // masking user password and role
            user.password = undefined;
        
             const obj =   {token: token, user : user}

             return obj

    } catch (error : any) {
        logger.info(error.message)
        throw error
    }
    
}

/*
* @author Suraj Dubey
* @description Service for get all users by role
*/
export const getUserByRole = async (input: string) =>{
    try {

        if(!["admin", "client", "product manager", "inspection manager"].includes(input)){
            throw new createHttpError.BadRequest("Invalid role")
        }

        const users = await User.find({role : input});

        if(users.length === 0){
            throw new createHttpError.NotFound(`No users found of ${input} role`)
        }

        return users;
    } catch (error : any) {
        throw error
    }
}
