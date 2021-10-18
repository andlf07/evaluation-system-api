import express from 'express';
import * as ctrl from '../controller/questionController';
import { questionCheckSchema } from '../helpers/validation/questionValidation';
import { validationHandler } from '../helpers/validation/validationHandler';

export const questionRouter = express.Router();

//GET all question
questionRouter.get('/', ctrl.getAllQuestion);

//POST question
questionRouter.post('/', validationHandler(questionCheckSchema),ctrl.postQuestion);

//Delete question
questionRouter.delete('/:questionId', ctrl.deleteQuestion);