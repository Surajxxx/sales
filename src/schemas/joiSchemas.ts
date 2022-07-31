import Joi from 'joi';

export const registerUserSchema = Joi.object({
    title : Joi.string().required().trim().valid("Mr", "Mrs", "Miss"),
    name : Joi.string().required().trim().min(3),
    role : Joi.string().required().trim().valid("admin", "client", "product manager", "inspection manager"),
    email : Joi.string().required().email().trim().lowercase(),
    password : Joi.string().required(), //.pattern(new RegExp(/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[#$@!%&?])[A-Za-z\d#$@!%&?]{8,15}$/)),
    phone : Joi.string().required().pattern(new RegExp(/^[6-9]\d{9}$/)),
    reportingManager : Joi.string().hex().length(24)
})

export const loginUserSchema = Joi.object({
    email : Joi.string().email().trim().lowercase(),
    password : Joi.string().required(),
    role : Joi.string().required().valid("admin", "client", "product manager", "inspection manager"),
    phone : Joi.string().pattern(new RegExp(/^[6-9]\d{9}$/)),
})

export const registerBlankChecklistSchema = Joi.object({
     clientId : Joi.string().required().hex().length(24),
     requirements : Joi.object({
        cooler : Joi.valid(null),
        padding : Joi.valid(null),
        compartment : Joi.valid(null),
        pallets : Joi.valid( null),
        waterProtection : Joi.valid(null)

     }),
     category : Joi.string().default(null),
     driverDetails : Joi.object().default({
        licensePresent : null,
        rc : null,
        phone : null,
        airPressureGood : null
     }),
     summary : Joi.string().default(null),
})

export const registerOrderSchema = Joi.object({
   
        clientId:  Joi.string().hex().required().length(24),
        status : Joi.string().default("pending"),
        items : Joi.number().required().min(1),
        itemType : Joi.string().valid("food", "medical", "houseHolds", "electronics", "other"),
        itemDetails : Joi.string().required(),
        coolerRequired  : Joi.boolean().default(false),
        paddingRequired : Joi.boolean().default(false),
        waterProtectionRequired : Joi.boolean().default(false),
        palletsRequired : Joi.boolean().default(false),
        sharingAllowed : Joi.boolean().default(false),
        deliveryTo : Joi.string().required().min(3),
        pickUpFrom : Joi.string().required().min(3),

});

export const filledChecklistSchema = Joi.object({
    requirements : Joi.object({
        cooler : Joi.boolean().default(false),
        padding : Joi.boolean().default(false),
        compartment : Joi.boolean().default(false),      
        pallets : Joi.boolean().default(false),
        waterProtection : Joi.boolean().default(false),
        }).required(),
    category: Joi.string().valid("food", "medical", "houseHolds", "electronics", "other").required(),
    driverDetails:  Joi.object({
        licensePresent : Joi.boolean().required(),
        rc : Joi.boolean().required(),
        phone : Joi.boolean().required(),
        airPressureGood : Joi.boolean().required(),
    }).required(), 
    summary : Joi.string()
})


export const updateStatusSchema = Joi.object({
    status : Joi.string().required().valid("completed", "dispatched")
})
