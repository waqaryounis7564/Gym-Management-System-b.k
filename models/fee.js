const mongoose = require("mongoose");
const Joi = require("joi");

function validateFee(body) {
  const schema = {
    member_id: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/),
    month: Joi.string().required(),
    feeAmount: Joi.number().required(),
    paid: Joi.boolean().required(),
    feeDue: Joi.number(),
    advancedFee: Joi.number()
  };
  return Joi.validate(body, schema);
}
const feeSchema = new mongoose.Schema({
  member: {
    type: new mongoose.Schema({
      name: { type: String, minlength: 3, maxlength: 50, required: true }
    })
  },

  month: { type: String, required: true },
  feeAmount: { type: Number, required: true },
  paid: { type: Boolean, default: false },
  feeDue: { type: Number, default: 0 },
  advancedFee: { type: Number, default: 0 }
});
const Fee = mongoose.model("fee", feeSchema);

exports.Fee = Fee;
exports.validate = validateFee;
