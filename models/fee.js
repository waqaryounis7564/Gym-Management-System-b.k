const mongoose = require("mongoose");
const Joi = require("joi");

function validateFee(body) {
  const schema = {
    member_id: Joi.string().required(),
    month: Joi.string().required(),
    feeAmount: Joi.number().required(),
    paid: Joi.boolean().required,
    feeDue: Joi.number().required,
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

  month: { type: Date, required: true },
  feeAmount: { type: Number, required: true },
  paid: { type: Boolean },
  feeDue: { type: Number },
  advancedFee: { type: Number }
});
const Fee = mongoose.model("fee", feeSchema);

exports.Fee = Fee;
exports.validate = validateFee;
