import Joi from "joi";

export const testCheckSchema = {
   id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
   answers: Joi.array().items(
      Joi.object({
         id_question: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
         answer: Joi.string().required()

      })
   ).has(Joi.object({ id_question: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), answer: Joi.string().required() })).required()
}