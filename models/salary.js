const mongoose = require("mongoose");
const Joi = require("joi");

function validateSalary(body) {
  const schema = {
    trainer_id: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/),
    month: Joi.string().required(),
    salaryAmount: Joi.number().required(),
    paid: Joi.boolean(),
    salaryDue: Joi.number(),
    advancedSalary: Joi.number()
  };
  return Joi.validate(body, schema);
}
const salarySchema = new mongoose.Schema({
  trainer: {
    type: new mongoose.Schema({
      name: { type: String, minlength: 3, maxlength: 50, required: true }
    })
  },
  month: { type: String, required: true },
  salaryAmount: { type: Number, required: true },
  paid: { type: Boolean, default: false },
  salaryDue: { type: Number, default: 0 },
  advancedSalary: { type: Number, default: 0 }
});
const Salary = mongoose.model("salary", salarySchema);

exports.Salary = Salary;
exports.validate = validateSalary;
