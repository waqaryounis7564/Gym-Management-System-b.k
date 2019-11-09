// Member-Assigned:

const mongoose = require("mongoose");
const Joi = require("joi");

function validateTrainer(body) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    mobile: Joi.string()
      .required()
      .max(13),
    cnic: Joi.string().required(),
    gender: Joi.string().required(),
    age: Joi.number().required(),
    dateOfJoining: Joi.string().required,
    biometric: Joi.string(),
    remarks: Joi.string(),
    memberAssigned: Joi.string()
  };
  return Joi.validate(body, schema);
}
const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  mobile: { type: String, required: true, maxlength: 15 },
  gender: { type: String, required: true },
  cnic: { type: String, required: true },
  age: { type: Number, required: true },
  dateOfJoining: { type: String, required: true },
  biometric: { type: String },
  remarks: { type: String },
  memberAssigned: { type: String }
});
const Trainer = mongoose.model("trainer", trainerSchema);

exports.Customer = Trainer;
exports.validate = validateTrainer;