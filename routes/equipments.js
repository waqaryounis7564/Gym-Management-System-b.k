const express = require("express");
const router = express.Router();

const { Equipment, validate } = require("../models/equipment");

router.get("/", async (req, res) => {
  try {
    let equipments = await Equipment.find();
    res.send(equipments);
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const equipment = await Equipment.findById({ _id: req.params.id });
    if (!equipment)
      return res.status(404).send("equipment with this id not found");
    res.send(equipment);
  }
  res.send("invalid id");
});

router.post("/", async (req, res) => {
  let { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let equipment = await new Equipment({
      name: req.body.name,
      quantity: req.body.quantity,
      equipmentAvailability: req.body.equipmentAvailability,
      description: req.body.description
    });
    await equipment.save();
    res.send(equipment);
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/:id", async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
      const equipment = await Equipment.findByIdAndUpdate(
        { _id: req.params.id },
        {
          name: req.body.name,
          quantity: req.body.quantity,
          equipmentAvailability: req.body.equipmentAvailability,
          description: req.body.description
        },

        { new: true }
      );
      res.send(equipment);
    } catch (error) {
      console.log(error);
    }
  }
  res.send("invalid id");
});
router.delete("/:id", async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      const equipment = await Equipment.findByIdAndDelete({
        _id: req.params.id
      });
      if (!equipment) return res.status(404).send("equipment not available");
      res.send(equipment);
    } catch (error) {
      console.log(error);
    }
  }
  res.send("invalid id");
});

module.exports = router;
