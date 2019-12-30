const express = require("express");
const router = express.Router();
const { Trainer, validate } = require("../models/trainer");
const { Member } = require("../models/member");

router.get("/", async (req, res) => {
  try {
    let trainers = await Trainer.find();
    res.send(trainers);
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const trainer = await Trainer.findById({ _id: req.params.id });
    if (!trainer) return res.status(400).send("invalid id");
    res.send(trainer);
  }
  res.send("invalid id");
});

router.post("/", async (req, res) => {
  let { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let trainer = new Trainer({
      name: req.body.name,
      mobile: req.body.mobile,
      gender: req.body.gender,
      cnic: req.body.cnic,
      age: req.body.age,

      dateOfJoining: req.body.dateOfJoining
    });
    await trainer.save();
    res.send(trainer);
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const trainer = await Trainer.findByIdAndUpdate(
      { _id: req.params.id },

      {
        name: req.body.name,
        mobile: req.body.mobile,
        gender: req.body.gender,
        cnic: req.body.cnic,
        age: req.body.age,
        dateOfJoining: req.body.dateOfJoining
      },

      { new: true }
    );
    await res.save(trainer);
    res.send(trainer);
  } catch (error) {
    console.log(error);
  }

  res.send("invalid id");
});
router.delete("/:id", async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      const trainer = await Trainer.findByIdAndDelete({ _id: req.params.id });
      if (!trainer) return res.status(400).send("trainer not available");
      res.send(trainer);
    } catch (error) {
      console.log(error);
    }
  }
  res.send("invalid id");
});

module.exports = router;
