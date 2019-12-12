const express = require("express");
const router = express.Router();
const { Physical, validate } = require("../models/physicalRecord");
const { Member } = require("../models/member");
const { Exercise } = require("../models/exercise");

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
    if (!physical)
      return res
        .status(404)
        .send("physical record with this id is not available");
    res.send(physical);
  }
  res.send("invalid id");
});

router.post("/", async (req, res) => {
  let { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const member = await Member.findById(req.body.member_id);
    if (!member) return res.status(404).send("member not found");

    const exercise = await Exercise.findById(req.body.exercise_id);
    if (!exercise) return res.status(404).send("exercise not found");
    let physical = await new Physical({
      exercise: { name: exercise.name },
      member: { name: member.name },
      month: req.body.month,
      height: req.body.height,
      weight: req.body.weight,
      waist: req.body.waist,
      bicep: req.body.bicep,
      triceps: req.body.triceps,
      chest: req.body.chest,
      shoulders: req.body.shoulders,
      thigh: req.body.thigh
    });
    await physical.save();
    res.send(physical);
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/:id", async (req, res) => {
  let { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const member = await Member.findById(req.body.member_id);
    if (!member) return res.status(404).send("member not found");

    const exercise = await Exercise.findById(req.body.exercise_id);
    if (!exercise) return res.status(404).send("exercise not found");
    const physical = await Physical.findByIdAndUpdate(
      { _id: req.params.id },
      {
        exercise: { name: exercise.name },
        member: { name: member.name },
        month: req.body.month,
        height: req.body.height,
        weight: req.body.weight,
        waist: req.body.waist,
        bicep: req.body.bicep,
        triceps: req.body.triceps,
        shoulders: req.body.shoulders,
        chest: req.body.chest
      },

      { new: true }
    );
    res.send(physical);
  } catch (error) {
    console.log(error);
  }
});
// if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
// const { error } = validate(req.body);
// if (error) return res.status(400).send(error.details[0].message);

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
