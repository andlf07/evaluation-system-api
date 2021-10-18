import Joi from "joi";

export const questionCheckSchema = {
   question: Joi.string().min(10).max(100).required(),
   answer: Joi.array().items(Joi.string().required()).min(4).max(4).required(),
   topic: Joi.string().required(),
   correctAnswer: Joi.string().required()
}