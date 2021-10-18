import { Schema, model } from "mongoose";

const testMakerSchema = new Schema({
   questions: {
      type: [Schema.Types.ObjectId],
      ref: 'Question',
      required: [true, 'questions is required']
   },
   good: {
      type: Number,
      required: [true, 'good is required']
   },
   bad: {
      type: Number,
      required: [true, 'bad is required']
   }
});

testMakerSchema.methods.toJSON = function() {
   const { __v, _id, ...test } = this.toObject();

   test.id = _id;

   return test;
}

export const testModel = model( 'Testmaker', testMakerSchema );