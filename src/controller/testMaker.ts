import { json, Request, Response } from "express";
import TestService from "../service/testService";

const testService = new TestService();

export const createTest = async ( req: Request, res: Response ) => {
   const { count, topic } = req.params;

   let limit = Number(count)

   if (limit < 5) {
      return res.status(400).json({
         error: 'The number of question for the test has to be at least 5'
      });
   };

   try {
      const test = await testService.createTest( topic, limit );
      const { questions, bad, good } = test;

      const withoutCorrectAnswer = questions.map((x: any) => {
         const { correctAnswer, question, answer, topic, _id } = x;
         return {
            id: _id,
            questions: question,
            answer,
            topic
         };
      });

      res.status(202).json({
         id: test._id,
         questions: withoutCorrectAnswer,
         good,
         bad
      });
   } catch (error) {
      return res.status(503).json({
         error: 'Something wrong with the server'
      });
   };
};

export const verifyTest = async ( req: Request, res: Response ) => {

   const { answers, id } = req.body;

   try {
      const findTest = await testService.getAndVerifyTest( id );

      if(findTest === null) res.status(404).json({
         error: 'Test dont exist'
      });

      let { questions, bad, good } = findTest;

      questions.forEach(element => {
         for ( let answer of answers ) {
            if(element._id.toString() === answer.id_question ) {
               element.correctAnswer === answer.answer ? good++ : bad++
               break;
            };
         };
      });
      res.status(200).json({
         good,
         bad
      });

   } catch (error) {
      return res.status(503).json({
         error: 'Something wrong with the server'
      });
   };
};