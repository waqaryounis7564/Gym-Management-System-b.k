//ExreciseAssigned

const mongoose = require("mongoose");
const Joi = require("joi");

function validateMember(body) {
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
    exercisesAssigned: Joi.string()
  };
  return Joi.validate(body, schema);
}
const memberSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  mobile: { type: String, required: true, maxlength: 15 },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  cnic: { type: String, required: true },
  dateOfJoining: { type: String, required: true },
  biometric: { type: String },
  remarks: { type: String },
  exercisesAssigned: { type: String }
});
const Member = mongoose.model("member", memberSchema);

exports.Customer = Member;
exports.validate = validateMember;
