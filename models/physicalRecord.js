const mongoose = require("mongoose");
const Joi = require("joi");

function validate(body) {
  const schema = {
    member_id: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/),
    exercise_id: Joi.array()
      .min(1)
      .required(),
    month: Joi.string().required(),
    height: Joi.number().required(),
    weight: Joi.number().required(),
    waist: Joi.number().required(),
    bicep: Joi.number().required(),
    triceps: Joi.number().required(),
    shoulders: Joi.number().required(),
    chest: Joi.number().required(),
    thigh: Joi.number().required()
  };
  return Joi.validate(body, schema);
}
const physicalSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  member: {
    type: new mongoose.Schema({
      name: { type: String, minlength: 3, maxlength: 50, required: true }
    })
  },
  exercises: {
    type: [
      new mongoose.Schema({
        name: { type: String, minlength: 3, maxlength: 50, required: true }
      })
    ]
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
