import { ObjectId } from "bson";
import MongoDB from "../lib/db";
import { questionModel } from "../lib/model/questionModel";
import { testModel } from "../lib/model/testModel";

interface Test {
   _id: ObjectId[],
   questions: Array<Question>,
   good: number,
   bad: number

}

interface Question {
   _id: ObjectId[],
   question: string,
   answer: [],
   topic: string,
   correctAnswer: string

}


export default class TestService {

   private db;
   private questionModel: any;
   private testModel: any;

   constructor() {
      this.db = new MongoDB();
      this.questionModel = questionModel;
      this.testModel = testModel;
   };

   get mongo() {
      return this.db;
   };

   async createTest( topic: string, count: number ): Promise<Test> {
      this.db.connect();
      const findQuestions = await this.questionModel.find({ topic: topic }).limit(count);

      const questionIds = findQuestions.map((x: any) => x._id);

      let data = {
         questions: questionIds,
         good: 0,
         bad: 0
      };

      const createTest = await new this.testModel( data );
      await createTest.save();


      const testPopulate = await this.testModel.findOne({ _id: createTest._id}).populate('questions')

      this.db.closeDB();

      return testPopulate;
   };

   async getAndVerifyTest( id: string ): Promise<Test> {
      this.db.connect();
      const findTest = await this.testModel.findOne({ _id: id }).populate('questions')
      this.db.closeDB();

      return findTest;
   };
};