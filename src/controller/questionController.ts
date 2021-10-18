import { Request, Response } from "express";
import { questionModel } from "../lib/model/questionModel";
import CrudService from "../service/crudService";

const crudService = new CrudService( questionModel );

export const getAllQuestion = async ( req: Request, res: Response ) => {
   try {
      const allQuestion = await crudService.getAllCollection();
      console.log(allQuestion)

      allQuestion === [] ? res.status(200).json({ msg: 'There no question' })
                         : res.status(200).json({
                           data: allQuestion,
                           msg: 'All questions'
                         });

   } catch (error) {
      res.status(503).json({
         error: 'Something wrong with the server'
      });
   }
};


export const postQuestion = async ( req: Request, res: Response) => {

   //get data in req.body
   const { body: data } = req;

   try {
      const createQuestion = await crudService.postDoc( data );
      res.status(201).json({
         data: createQuestion,
         masg: 'Question had been create'
      })
   } catch (error) {
      return res.status(503).json({
         error: 'Something wrong with the server'
      });
   }
};

export const deleteQuestion = async ( req: Request, res: Response ) => {
   const { questionId } = req.params;
   try {
      const deleteQuestion = await crudService.deleteDoc( questionId );

      res.status(200).json({
         data: deleteQuestion,
         msg: 'Question delete'
      })
   } catch (error) {
      return res.status(503).json({
         error: 'Something wrong with the server'
      });
   };
};