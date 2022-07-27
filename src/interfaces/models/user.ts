import {Types} from 'mongoose'
interface IUser {
    title: string,
    name: string,
    role: string,
    email: string,
    phone: string,
    password: string,
    creator: Types.ObjectId
}

export default IUser;