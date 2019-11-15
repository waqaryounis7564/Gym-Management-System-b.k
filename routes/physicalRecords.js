const express = require("express");
const router = express.Router();
const { Physical, validate } = require("../models/physicalRecord");
const { Member } = require("../models/member");

router.get("/", async (req, res) => {
  try {
    let physicals = await Physical.find();
    res.send(physicals);
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const physical = await Physical.findById({ _id: req.params.id });
    if (!physical) return res.status(400).send("invalid id");
    res.send(physical);
  }
  res.send("invalid id");
});

router.post("/", async (req, res) => {
  let { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const member = await Member.findById(req.body.member_id);
    if (!member) return res.status(400).send("member not found");

    let physical = await new Physical({
      member: { name: member.name },
      Month: req.body.month,
      Height: req.body.height,
      Weight: req.body.weight,
      Waist: req.body.waist,
      Bicep: req.body.bicep,
      Triceps: req.body.triceps,
      Shoulders: req.body.shoulders,
      Chest: req.body.chest
    });
    await physical.save();
    res.send(physical);
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/:id", async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    // const { error } = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    try {
      const physical = await physical.findByIdAndUpdate(
        { _id: req.params.id },
        {
          Month: req.body.month,
          Height: req.body.height,
          Weight: req.body.weight,
          Waist: req.body.waist,
          Bicep: req.body.bicep,
          Triceps: req.body.triceps,
          Shoulders: req.body.shoulders,
          Chest: req.body.chest
        },

        { new: true }
      );
      res.send(physical);
    } catch (error) {
      console.log(error);
    }
  }
  res.send("invalid id");
});
router.delete("/:id", async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      const physical = await physical.findByIdAndDelete({ _id: req.params.id });
      if (!physical) return res.status(400).send("physical not available");
      res.send(physical);
    } catch (error) {
      console.log(error);
    }
  }
  res.send("invalid id");
});

module.exports = router;
