const express = require("express");
const router = express.Router();
const { Attendance, validate } = require("../models/attendance");
const { Trainer } = require("../models/trainer");

router.get("/", async (req, res) => {
  try {
    let attendances = await Attendance.find();
    res.send(attendances);
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const attendance = await Attendance.findById({ _id: req.params.id });
    if (!attendance) return res.status(400).send("invalid id");
    res.send(attendance);
  }
  res.send("invalid id");
});

router.post("/", async (req, res) => {
  //   let { error } = validate(req.body);
  //   if (error) return res.status(400).send(error.details[0].message);

  try {
    const trainer = await Trainer.findById(req.body.trainer_id);
    if (!trainer) return res.status(400).send("trainer not found");

    let attendance = new Attendance({
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
      // totalTime: req.body.checkOut - req.body.checkIn,
      user: { name: trainer.name }
    });
    await attendance.save();
    res.send(attendance);
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/:id", async (req, res) => {
  // if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
  //     // const { error } = validate(req.body);
  //     // if (error) return res.status(400).send(error.details[0].message);
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      { _id: req.params.id },
      {
        //checkIn: req.body.checkIn,
        checkOut: req.body.checkOut
        // totalTime: req.body.checkOut - req.body.checkIn,
        // user: { name: trainer.name }
      },

      { new: true }
    );
    res.send(attendance);
  } catch (error) {
    console.log(error);
  }
  //}
  res.send("invalid id");
});
router.delete("/:id", async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      const attendance = await Attendance.findByIdAndDelete({
        _id: req.params.id
      });
      if (!attendance) return res.status(400).send("Attendance not available");
      res.send(attendance);
    } catch (error) {
      console.log(error);
    }
  }
  res.send("invalid id");
});

module.exports = router;
