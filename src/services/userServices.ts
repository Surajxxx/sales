import User from '../models/userModel';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import {IUserModel} from '../models/userModel'
import logger from '../logger/logger';


export const createUser = async (input: any) => {
    try {
        // verify email and phone number are unique
        const isEmailExist = await User.findOne({ email: input.email });

        if(isEmailExist){
          throw new createHttpError.NotAcceptable('Email already exists');
        }
        const isPhoneNumberExist = await User.findOne({ phone: input.phone });

        if(isPhoneNumberExist){
            throw new createHttpError.NotAcceptable('Phone number already exists');
        }

        const user : any = await User.create(input)
        // masking password and role
        user.password = undefined;
        user.role = undefined;

        return user
    } catch (error : any) {
        logger.info(error.message)
      throw error
    }
}


export const loginUser = async (input: any) : Promise<any> => {


    try {
        const user : any = await User.findOne({ email: input.email });

        if(!user){
            throw new createHttpError.NotFound('Email does not exist');
        }

        user.comparePassword(input.password, (err : any, isMatch : any) => {
            if (err) {
                console.log("err", err)
               throw err;
            }

            if (! isMatch) {
               throw new createHttpError.NotFound('Invalid password');
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
            console.log("token", token);
             let obj =   {token: token, user : user}
             return obj
            })

    } catch (error : any) {
        logger.info(error.message)
        throw error
    }
   
}

