const mongoose = require("mongoose");
const Joi = require("joi");

function validateFee(body) {
  const schema = {
    member_id: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/),
    feeMonth: Joi.string().required(),
    amountPaid: Joi.number().required(),
    feeStatus: Joi.string().required(),
    //feeDue: Joi.number(),
    //totalAmount: Joi.number(),
    advancedFee: Joi.number().required()
  };
  return Joi.validate(body, schema);
}

function validateModifyFee(body) {
  const schema = {
    member_id: Joi.string(),
    feeMonth: Joi.string().required(),
    amountPaid: Joi.number().required(),
    feeStatus: Joi.string().required(),
    advancedFee: Joi.number().required(),
    feeDue: Joi.number().required(),
    monthlyFee: Joi.number().required(),
    totalAmount: Joi.number().required()
  };
  return Joi.validate(body, schema);
}

const feeSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  member: {
    type: new mongoose.Schema({
      name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
      },
      monthlyFee: { type: Number, required: true }
    })
  },

  feeMonth: { type: String, required: true },
  amountPaid: { type: Number, required: true },
  feeStatus: { type: String, required: true },
  feeDue: { type: Number },
  advancedFee: { type: Number, required: true },
  totalAmount: { type: Number }
});
const Fee = mongoose.model("fee", feeSchema);

exports.Fee = Fee;
exports.validate = validateFee;
exports.Modify = validateModifyFee;
