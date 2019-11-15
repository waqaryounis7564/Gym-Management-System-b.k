const mongoose = require("mongoose");
const joi = require("joi");
//const jwt = require("jsonwebtoken");

function validate(body) {
  const schema = {
    name: joi
      .string()
      .required()
      .min(3)
      .max(50),
    email: joi
      .string()
      .email()
      .required(),
    phone: joi
      .string()
      .max(13)
      .required(),
    password: joi
      .string()
      .required()
      .min(5)
      .max(255)
  };
  return joi.validate(body, schema);
}

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  phone: {
    type: String,
    maxlength: 13,
    required: true
  },
  password: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 1024,
    required: true
  },
  isAdmin: { type: Boolean, default: true }
});
// adminSchema.methods.Authentication = function() {
//   //here we are defining payload of jwt
//   const token = jwt.sign(
//     { _id: this._id, admin: this.isAdmin },
//     process.env.privateKey
//   );
//   return token;
// };
const Admin = mongoose.model("admin", adminSchema);

exports.validate = validate;
exports.Admin = Admin;
