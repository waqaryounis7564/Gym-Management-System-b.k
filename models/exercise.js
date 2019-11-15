const mongoose = require("mongoose");
const Joi = require("joi");

function validateExercise(body) {
  const schema = {
    exerciseType: Joi.string()
      .min(3)
      .max(50)
      .required(),
    name: Joi.string()
      .required()
      .min(3)
      .max(50),
    description: Joi.string()
      .required()
      .max(1000)
  };
  return Joi.validate(body, schema);
}
const exerciseSchema = new mongoose.Schema({
  exerciseType: { type: String, required: true, minlength: 3, maxlength: 50 },
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  description: { type: String, required: true, maxlength: 1000 }
});
const Exercise = mongoose.model("exercise", exerciseSchema);

exports.Exercise = Exercise;
exports.exerciseSchema = exerciseSchema;
exports.validate = validateExercise;
