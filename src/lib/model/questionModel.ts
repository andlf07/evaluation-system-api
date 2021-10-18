import { Schema, model } from "mongoose";

const answerModel = new Schema({ asnwer: String })

const questionSchema = new Schema({
   question: {
      type: String,
      required: [true, 'question is required']
   },
   answer: {
      type: Array,
      required: [true, 'answer is required']
   },
   topic: {
      type: String,
      required: [true, 'topic is required']
   },
   correctAnswer: {
      type: String,
      required: [true, 'correctAnswer is required']
   }
});

questionSchema.methods.toJSON = function() {
   const { __v, _id, correctAnswer,...question } = this.toObject();

   question.id = _id;

   return question;
}

export const questionModel = model( 'Question', questionSchema );
