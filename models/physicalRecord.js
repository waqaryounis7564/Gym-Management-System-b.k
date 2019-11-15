const mongoose = require("mongoose");
const joi = require("joi");

function validate(body) {
  const schema = {
    member_id: joi
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
  Month: { type: String, required: true },
  Height: { type: Number, required: true },
  Weight: { type: Number, required: true },
  Waist: { type: Number, required: true },
  Bicep: { type: Number, required: true },
  Triceps: { type: Number, required: true },
  Shoulders: { type: Number, required: true },
  Thigh: { type: Number, required: true },
  Chest: { type: Number, required: true }
});

const Physical = mongoose.model("physicalRecord", physicalSchema);

module.exports.Physical = Physical;
module.exports.validate = validate;
