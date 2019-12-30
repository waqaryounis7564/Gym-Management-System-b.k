const mongoose = require("mongoose");
const Joi = require("joi");

function validateCheckIn(body) {
  const schema = {
    checkIn: Joi.string().required(),
    checkOut: Joi.string(),
    trainer_id: Joi.string().required()
  };
  return Joi.validate(body, schema);
}
function validateCheckOut(body) {
  const schema = {
    checkIn: Joi.string(),
    checkOut: Joi.string().required(),
    trainer_id: Joi.string()
  };
  return Joi.validate(body, schema);
}
const attendanceSchema = new mongoose.Schema({
  userId: { type: String },
  checkIn: { type: String },
  checkOut: { type: String },
  user: {
    type: new mongoose.Schema({
      name: { type: String, minlength: 3, maxlength: 50, required: true }
    })
  }
});
const Attendance = mongoose.model("attendance", attendanceSchema);

exports.Attendance = Attendance;
exports.validateIn = validateCheckIn;
exports.validateOut = validateCheckOut;
