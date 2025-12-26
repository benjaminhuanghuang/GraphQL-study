import mongoose from "mongoose";

const Schema = mongoose.Schema;
export const CourseSchema = new Schema({
  title: String,

  description: String,

  price: Number,
});

export const Course = mongoose.model("Course", CourseSchema);
