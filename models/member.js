const mongoose = require("mongoose");
const Joi = require("joi");

function validateMember(body) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    mobile: Joi.string()
      .max(13)
      .required(),
    gender: Joi.string().required(),
    age: Joi.number().required(),
    cnic: Joi.string().required(),
    dateOfJoining: Joi.string().required(),
    biometric: Joi.string()
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
  remarks: { type: String }
});
const Member = mongoose.model("member", memberSchema);

exports.Member = Member;
exports.validate = validateMember;
