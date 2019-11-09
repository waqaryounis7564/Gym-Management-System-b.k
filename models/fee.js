const mongoose = require("mongoose");
const Joi = require("joi");

function validateFee(body) {
  const schema = {
    member: Joi.string()
      .min(3)
      .max(50)
      .required(),
    month: Joi.string()
      .required()
      .max(13),
    feeAmount: Joi.number().required(),
    paid: Joi.boolean(),
    feeDue: Joi.number(),
    advancedFee: Joi.number()
  };
  return Joi.validate(body, schema);
}
const feeSchema = new mongoose.Schema({
  member: { type: String, required: true, minlength: 3, maxlength: 50 },
  month: { type: Date, required: true },
  feeAmount: { type: Number, required: true },
  paid: { type: Boolean },
  feeDue: { type: Number },
  advancedFee: { type: Number }
});
const Fee = mongoose.model("fee", feeSchema);

exports.Fee = Fee;
exports.validate = validateFee;
