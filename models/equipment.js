const mongoose = require("mongoose");
const Joi = require("joi");

function validateEquipment(body) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    quantity: Joi.number().required(),
    equipmentAvailability: Joi.string().required(),
    description: Joi.string()
  };
  return Joi.validate(body, schema);
}
const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  quantity: { type: Number, required: true },
  equipmentAvailability: { type: String, required: true },
  description: { type: String, required: true }
});
const Equipment = mongoose.model("equipment", equipmentSchema);

exports.Equipment = Equipment;
exports.validate = validateEquipment;
