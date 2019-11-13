const mongoose = require("mongoose");
const joi = require("joi");

function validate(body) {
  const schema = {
    user_id: joi.string().required(),
    month: joi.string().required(),
    height: joi.number().required(),
    weight: joi.number().required(),
    waist: joi.number().required(),
    bicep: joi.number().required(),
    Shoulder: joi.number().required(),
    chest: joi.number().required(),
    thigh: joi.number().required()
  };
  return joi.validate(body, schema);
}
const physicalSchema = new mongoose.Schema({
  user: {
    type: new mongoose.Schema({
      name: { type: String, minlength: 3, maxlength: 50, required: true }
    })
  },
  Month: { type: Date },
  Height: { type: Number },
  Weight: { type: Number },
  Waist: { type: Number },
  Bicep: { type: Number },
  Triceps: { type: Number },
  Shoulders: { type: Number }
});

const Physical = mongoose.model("physicalRecord", physicalSchema);

module.exports.Physical = Physical;
module.exports.validate = validate;
