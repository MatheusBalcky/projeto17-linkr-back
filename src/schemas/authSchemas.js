import joi from "joi";


export const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})

export const signUpSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    username: joi.string().required(),
    pictureUrl: joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/).required(),
});