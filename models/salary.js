const mongoose = require("mongoose");
const Joi = require("joi");

function validateSalary(body) {
  const schema = {
    trainer_id: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/),
    salaryMonth: Joi.string().required(),
    salaryAmount: Joi.number().required(),
    salaryStatus: Joi.string(),
    salaryDue: Joi.number(),
    advancedSalary: Joi.number()
  };
  return Joi.validate(body, schema);
}
const salarySchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  trainer: {
    type: new mongoose.Schema({
      name: { type: String, minlength: 3, maxlength: 50, required: true }
    })
  },
  salaryMonth: { type: String, required: true },
  salaryAmount: { type: Number, required: true },
  salaryStatus: { type: String, required: true },
  salaryDue: { type: Number, default: 0 },
  advancedSalary: { type: Number, default: 0 }
});
const Salary = mongoose.model("salary", salarySchema);

exports.Salary = Salary;
exports.validate = validateSalary;
