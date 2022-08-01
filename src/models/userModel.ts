import {Schema, Model, Document, model, mongo, Types} from "mongoose";
import IUser from "../interfaces/models/user";
import bcrypt from 'bcrypt';
import mongooseUniqueValidator from 'mongoose-unique-validator';

/*
* @author Suraj Dubey
* @description User schema and model objects
*/

export interface IUserModel extends IUser, Document {
    comparePassword(password: string, cb : any): string;
}

// user Schema
export const userSchema : Schema = new Schema({
    title: {type: String, enum: ["Mr", "Mrs", "Miss"], required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String, required: true, unique: true},
    role: {type: String, required: true, enum: ["admin", "client", "product manager", "inspection manager"],default: "client"},
    name: {type: String, required: true},
    createdBy : {type: Schema.Types.ObjectId },
    reportingManager : {type : Schema.Types.ObjectId}
}, {timestamps : true})


// password hashing function
userSchema.pre<IUserModel>('save', async function (next) {
    const user = this;
    if(!user.isModified('password')) {
        return next();
    }
    try {     
        const salt = await bcrypt.genSaltSync(12);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        return next();
    } catch (error : any) {
        return next(error);
    }
});

// compare password function
userSchema.methods.comparePassword = function (requestPassword: string, cb : any) : any {
    bcrypt.compare(requestPassword, this.password, (err, isMatch) => {
        return cb(err, isMatch);
    })
};

// unique fields validation
userSchema.plugin(mongooseUniqueValidator, {message: 'already taken'});


// creating model
const User = model<IUserModel>('User', userSchema);

export default User;