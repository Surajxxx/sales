import Joi from 'joi';

export const registerUserSchema = Joi.object({
    title : Joi.string().required().trim().valid("Mr", "Mrs", "Miss"),
    name : Joi.string().required().trim().min(3),
    role : Joi.string().required().trim().valid("admin", "client", "product manager", "inspection manager"),
    email : Joi.string().required().email().trim().lowercase(),
    password : Joi.string().required(), //.pattern(new RegExp(/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[#$@!%&?])[A-Za-z\d#$@!%&?]{8,15}$/)),
    phone : Joi.string().required().pattern(new RegExp(/^[6-9]\d{9}$/)),
})

export const loginUserSchema = Joi.object({
    email : Joi.string().email().trim().lowercase(),
    password : Joi.string().required(),
    role : Joi.string().required().valid("admin", "client", "product manager", "inspection manager"),
    phone : Joi.string().pattern(new RegExp(/^[6-9]\d{9}$/)),
})

export const registerChecklistSchema = Joi.object({
     clientId : Joi.string().required().hex().length(24),
     createdBy : Joi.string().hex().length(24),
     coolerPresent : Joi.boolean().default(false).required(),
     isVerified : Joi.boolean().default(false),
     category : Joi.string().valid("food", "medical", "houseHolds").required(),
     driverDetails : Joi.object({
        licensePresent : Joi.boolean().default(true),
        rc : Joi.boolean().default(true),
        phone : Joi.boolean().default(true)
     })
})

export const registerOrderSchema = Joi.object({
    clientId : Joi.string().required().hex().length(24),
    createdBy : Joi.string().hex().length(24),
    status : Joi.string().required().valid("pending", "inTransit", "completed", "cancelled"),
    checklistId : Joi.string().required().hex().length(24),
    items : Joi.number().required().min(1),
    deliveryAt : Joi.string().required(),

})