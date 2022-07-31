import { IRequest, IResponse, INext } from '../interfaces/vendors';
import logger from '../logger/logger';
import { registerUserSchema,
     loginUserSchema,
     registerBlankChecklistSchema,
    registerOrderSchema, filledChecklistSchema, updateStatusSchema} from '../schemas/joiSchemas'



const requestValidator = (req : any, next : INext, schema : any) => {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        logger.info(error)
         error.status = 422; //
       return next(error);
    } else {
        req.body = value;
       return next();
    }
}

const formDataValidator = (req : any, next : INext, schema : any) => {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    let requestBody = {...req.body}

    if(requestBody.requirements) {
        requestBody.requirements = JSON.parse(requestBody.requirements);
    }
    if(requestBody.driverDetails){
        requestBody.driverDetails = JSON.parse(requestBody.driverDetails);
    }
    const { error, value } = schema.validate(requestBody, options);
    if (error) {
        logger.info(error)
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
    const schema = registerOrderSchema;
    requestValidator(req, next, schema);
}

export const createFilledChecklistSchema = (req: any, res: IResponse, next : INext) => {
    const schema = filledChecklistSchema;
    formDataValidator(req, next, schema)
}

export const updateOrderStatusSchema = (req: any, res: IResponse, next : INext) => {
    const schema = updateStatusSchema;
    requestValidator(req, next, schema);
}