import {Types} from 'mongoose'

/*
* @author Suraj Dubey
* @description interface for creating users
*/
interface IUser {
    title: string,
    name: string,
    role: string,
    email: string,
    phone: string,
    password: string,
    createdBy: Types.ObjectId,
    reportingManager ?: Types.ObjectId,
}

export default IUser;