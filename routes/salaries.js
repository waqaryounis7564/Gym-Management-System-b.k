const express = require("express");
const router = express.Router();
const { Trainer } = require("../models/trainer");
const { Salary, validate } = require("../models/salary");

router.get("/", async (req, res) => {
  try {
    let salary = await Salary.find();
    res.send(salary);
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const salary = await Salary.findById({ _id: req.params.id });
    if (!salary) return res.status(400).send("invalid id");
    res.send(salary);
  }
  res.send("invalid id");
});

router.post("/", async (req, res) => {
  let { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const trainer = await Trainer.findById(req.body.trainer_id);
    if (!trainer) return res.status(400).send("trainer not found");

    let salary = await new Salary({
      trainer: { name: trainer.name },
      month: req.body.month,
      salaryAmount: req.body.salaryAmount,
      paid: req.body.paid,
      salaryDue: req.body.salaryDue,
      advancedSalary: req.body.advancedsalary
    });
    await salary.save();
    res.send(salary);
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/:id", async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    // const { error } = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    try {
      const salary = await Salary.findByIdAndUpdate(
        { _id: req.params.id },
        {
          month: req.body.month,
          salaryAmount: req.body.salaryAmount,
          paid: req.body.paid,
          salaryDue: req.body.salaryDue,
          advancedSalary: req.body.advancedSalary
        },

        { new: true }
      );
      res.send(salary);
    } catch (error) {
      console.log(error);
    }
  }
  res.send("invalid id");
});
router.delete("/:id", async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      const salary = await Salary.findByIdAndDelete({ _id: req.params.id });
      if (!salary) return res.status(400).send("salary not available");
      res.send(salary);
    } catch (error) {
      console.log(error);
    }
  }
  res.send("invalid id");
});

module.exports = router;
