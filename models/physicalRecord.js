const mongoose = require("mongoose");
const joi = require("joi");

function validate(body) {
  const schema = {
    member_id: joi
      .string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/),
    exercise_id: joi
      .string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/),
    month: joi.string().required(),
    height: joi.number().required(),
    weight: joi.number().required(),
    waist: joi.number().required(),
    bicep: joi.number().required(),
    triceps: joi.number().required(),
    shoulders: joi.number().required(),
    chest: joi.number().required(),
    thigh: joi.number().required()
  };
  return joi.validate(body, schema);
}
const physicalSchema = new mongoose.Schema({
  member: {
    type: new mongoose.Schema({
      name: { type: String, minlength: 3, maxlength: 50, required: true }
    })
  },
  exercise: {
    type: new mongoose.Schema({
      name: { type: String, minlength: 3, maxlength: 50, required: true }
    })
  },
  month: { type: String, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  waist: { type: Number, required: true },
  bicep: { type: Number, required: true },
  triceps: { type: Number, required: true },
  shoulders: { type: Number, required: true },
  thigh: { type: Number, required: true },
  chest: { type: Number, required: true }
});

const Physical = mongoose.model("physicalRecord", physicalSchema);

module.exports.Physical = Physical;
module.exports.validate = validate;
