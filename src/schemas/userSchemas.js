import joi from "joi";

export const userSchemas = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "br"] } }).required(),
    password: joi.string().required(),
    location: joi.string().required(),
    is_doctor:joi.boolean().required(),
    specialty:joi.when('is_doctor',{
        is: true,
        then: joi.string().required(),
    })
  });   