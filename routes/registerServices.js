const express = require("express");
const router = express.Router();
const { Member } = require("../models/member");
const { Trainer } = require("../models/trainer");
const {
  RegisterService,
  validate,
  Modify
} = require("../models/registerService");

router.get("/", async (req, res) => {
  try {
    let registerServices = await RegisterService.find();
    res.send(registerServices);
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const registerService = await RegisterService.findById({
      _id: req.params.id
    });
    if (!registerService) return res.status(400).send("invalid id");
    res.send(registerService);
  }
  res.send("invalid id");
});

router.post("/", async (req, res) => {
  let { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let assignMembers = [];
    const user = await Trainer.findById(req.body.trainer_id);
    if (!user) return res.status(400).send("trainer is not available");

    for (let i = 0; i < req.body.assignedMembers_id.length; i++) {
      const member = await Member.findById(req.body.assignedMembers_id[i]);
      if (!member) return res.status(400).send("Member is not available");

      assignMembers.push(member);
    }

    const registeredMember = await RegisterService.findOne({
      userId: req.body.trainer_id
    });
    if (registeredMember)
      return res.status(409).send("Trainer already Assigned");

    let registerService = new RegisterService({
      userId: user._id,
      trainer: {
        name: user.name
      },
      members: assignMembers,
      assignedDate: req.body.assignedDate
    });
    await registerService.save();
    res.send(registerService);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = Modify(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let assignMembers = [];

    for (let i = 0; i < req.body.assignedMembers_id.length; i++) {
      const member = await Member.findById(req.body.assignedMembers_id[i]);
      if (!member) return res.status(400).send("Member is not available");

      assignMembers.push(member);
    }
    const registerService = await RegisterService.findByIdAndUpdate(
      { _id: req.params.id },
      {
        members: assignMembers,
        assignedDate: req.body.assignedDate
      },

      { new: true }
    );
    res.send(registerService);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/:id", async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      const registerService = await RegisterService.findByIdAndDelete({
        _id: req.params.id
      });
      if (!registerService) return res.status(400).send("member not available");
      res.send(registerService);
    } catch (error) {
      console.log(error);
    }
  }
  res.send("invalid id");
});

module.exports = router;
