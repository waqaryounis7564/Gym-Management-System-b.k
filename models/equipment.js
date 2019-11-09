// Type:
// Name:
// Quantity:
// Description:
// Condition:

const mongoose = require("mongoose");
const Joi = require("joi");

function validateEquipment(body) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    quantity: Joi.number().required(),
    equipmentAvailability: Joi.boolean().required(),
    description: Joi.string()
  };
  return Joi.validate(body, schema);
}
const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  quantity: { type: Number, required: true },
  equipmentAvailability: { type: Boolean, required: true },
  paid: { type: Boolean },
  description: { type: String }
});
const Equipment = mongoose.model("equipment", equipmentSchema);

exports.Equipment = Equipment;
exports.validate = validateEquipment;
