import { IRequest, IResponse, INext } from '../interfaces/vendors';
import { registerUserSchema,
     loginUserSchema,
     registerBlankChecklistSchema,
    registerOrderSchema} from '../schemas/joiSchemas'



const requestValidator = (req : any, next : INext, schema : any) => {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
         error.status = 422; //
       return next(error);
    } else {
        req.body = value;
       return next();
    }
}

export const createUserSchema = (req: any, res: IResponse, next : INext) => {
    const schema = registerUserSchema
    requestValidator(req, next, schema);
}


export const loginSchema = (req: any, res: IResponse, next : INext) => {
    const schema = loginUserSchema
    requestValidator(req, next, schema);
}


export const createBlankChecklistSchema = (req: any, res: IResponse, next : INext) => {
    const schema = registerBlankChecklistSchema
    requestValidator(req, next, schema);
}


export const createOrderSchema = (req: any, res: IResponse, next : INext) => {
    const schema = registerOrderSchema
    requestValidator(req, next, schema);
}