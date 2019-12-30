const mongoose = require("mongoose");
const Joi = require("joi");

function validateService(body) {
  const schema = {
    trainer_id: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/),
    assignedMembers_id: Joi.required(),
    assignedDate: Joi.string().required(),
    trainerName: Joi.string()
  };
  return Joi.validate(body, schema);
}

function validateModifyService(body) {
  const schema = {
    assignedMembers_id: Joi.array()
      .min(1)
      .required(),
    assignedDate: Joi.string().required()
  };
  return Joi.validate(body, schema);
}

const registerServiceSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  trainerName: { type: String },
  trainer: {
    type: new mongoose.Schema({
      name: { type: String, minlength: 3, maxlength: 50, required: true }
    })
  },
  members: {
    type: [
      new mongoose.Schema({
        name: {
          type: String,
          minlength: 3,
          maxlength: 50,
          required: true
        }
      })
    ]
  },
  assignedDate: { type: String, required: true }
});
const RegisterService = mongoose.model(
  "registerService",
  registerServiceSchema
);

exports.RegisterService = RegisterService;
exports.validate = validateService;
exports.Modify = validateModifyService;
