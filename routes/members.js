const express = require("express");
const router = express.Router();
const { Member, validate } = require("../models/member");
const { Exercise } = require("../models/exercise");

router.get("/", async (req, res) => {
  try {
    let members = await Member.find();
    res.send(members);
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const member = await Member.findById({ _id: req.params.id });
    if (!member) return res.status(400).send("invalid id");
    res.send(member);
  }
  res.send("invalid id");
});

router.post("/", async (req, res) => {
  let { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const exercise = await Exercise.findById(req.body.exercise_id);
    if (!exercise) return res.status(400).send("exercise not found");

    let member = await new Member({
      name: req.body.name,
      mobile: req.body.mobile,
      cnic: req.body.cnic,
      gender: req.body.gender,
      age: req.body.age,
      biometric: req.body.biometric,
      dateOfJoining: req.body.dateOfJoining,
      remarks: req.body.remarks,
      exercisesAssigned: {
        _id: exercise._id,
        exerciseType: exercise.exerciseType,
        name: exercise.name,
        description: exercise.description
      }
    });
    await member.save();
    res.send(member);
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/:id", async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
      const member = await Member.findByIdAndUpdate(
        { _id: req.params.id },
        {
          name: req.body.name,
          mobile: req.body.mobile,
          cnic: req.body.cnic,
          gender: req.body.gender,
          age: req.body.age,
          biometric: req.body.biometric,
          dateOfJoining: req.body.dateOfJoining
        },

        { new: true }
      );
      res.send(member);
    } catch (error) {
      console.log(error);
    }
  }
  res.send("invalid id");
});
router.delete("/:id", async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      const member = await Member.findByIdAndDelete({ _id: req.params.id });
      if (!member) return res.status(400).send("member not available");
      res.send(member);
    } catch (error) {
      console.log(error);
    }
  }
  res.send("invalid id");
});

module.exports = router;
