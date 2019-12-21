const mongoose = require("mongoose");
const Joi = require("joi");

function validateAttendance(body) {
  const schema = {
    checkIn: Joi.string(),
    checkOut: Joi.string(),

    trainer_id: Joi.string().required()
  };
  return Joi.validate(body, schema);
}
const attendanceSchema = new mongoose.Schema({
  checkIn: { type: String },
  checkOut: { type: String },
  // totalTime: { type: Number },
  user: {
    type: new mongoose.Schema({
      name: { type: String, minlength: 3, maxlength: 50, required: true }
    })
  }
});
const Attendance = mongoose.model("attendance", attendanceSchema);

exports.Attendance = Attendance;
exports.validate = validateAttendance;
