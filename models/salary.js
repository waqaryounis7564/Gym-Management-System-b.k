const mongoose = require("mongoose");
const Joi = require("joi");

function validateSalary(body) {
  const schema = {
    triner: Joi.string()
      .min(3)
      .max(50)
      .required(),
    month: Joi.string()
      .required()
      .max(13),
    salaryAmount: Joi.number().required(),
    paid: Joi.boolean(),
    salaryDue: Joi.number(),
    advancedSalary: Joi.number()
  };
  return Joi.validate(body, schema);
}
const salarySchema = new mongoose.Schema({
  trainer: { type: String, required: true, minlength: 3, maxlength: 50 },
  month: { type: Date, required: true },
  salaryAmount: { type: Number, required: true },
  paid: { type: Boolean },
  salaryDue: { type: Number },
  advancedSalary: { type: Number }
});
const Salary = mongoose.model("salary", salarySchema);

exports.Salary = Salary;
exports.validate = validateSalary;
