import joi from "joi";

export const postSchema = joi.object({
    postUrl: joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/).required(),
    postDescription: joi.string().max(250).allow("").required()
});