const express = require("express");
const router = express.Router();
const { Exercise, validate } = require("../models/exercise");

router.get("/", async (req, res) => {
  try {
    let exercises = await Exercise.find();
    res.send(exercises);
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const exercise = await Exercise.findById({ _id: req.params.id });
    if (!exercise) return res.status(400).send("invalid id");
    res.send(exercise);
  }
  res.send("invalid id");
});

router.post("/", async (req, res) => {
  let { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let exercise = await new Exercise({
      exerciseType: req.body.exerciseType,
      name: req.body.name,
      description: req.body.description
    });
    await exercise.save();
    res.send(exercise);
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/:id", async (req, res) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/))
    return res.status(400).send("invalid _id pattern");
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const exercise = await Exercise.findByIdAndUpdate(
      { _id: req.params.id },
      {
        exerciseType: req.body.exerciseType,
        name: req.body.name,
        description: req.body.description
      },

      { new: true }
    );

    res.send(exercise);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      const exercise = await Exercise.findByIdAndDelete({ _id: req.params.id });
      if (!exercise) return res.status(400).send("exercise not available");
      res.send(exercise);
    } catch (error) {
      console.log(error);
    }
  }
  res.send("invalid id");
});

module.exports = router;
