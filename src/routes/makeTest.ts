import express from 'express';
import * as ctrl from '../controller/testMaker';
import { testCheckSchema } from '../helpers/validation/testValidation';
import { validationHandler } from '../helpers/validation/validationHandler';

export const testMaker = express.Router();

//TestMaker
testMaker.get('/:topic/:count', ctrl.createTest)


//verify test
testMaker.post('/', validationHandler(testCheckSchema),ctrl.verifyTest);