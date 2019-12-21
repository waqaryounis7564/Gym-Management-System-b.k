const express = require("express");
const router = express.Router();
const { Member } = require("../models/member");
const { Fee, validate } = require("../models/fee");

router.get("/", async (req, res) => {
  try {
    let fee = await Fee.find();
    res.send(fee);
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const fee = await Fee.findById({ _id: req.params.id });
    if (!fee) return res.status(400).send("invalid id");
    res.send(fee);
  }
  res.send("invalid id");
});

router.post("/", async (req, res) => {
  let { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await Member.findById(req.body.member_id);
    if (!user) return res.status(400).send("member is not available");

    const registeredMember = await Fee.findOne({ userId: req.body.member_id });
    if (registeredMember) return res.status(409).send("Member already exist");

    let fee = new Fee({
      userId: user._id,
      member: {
        name: user.name,
        monthlyFee: user.monthlyFee
      },
      feeMonth: req.body.feeMonth,
      amountPaid: req.body.amountPaid,
      feeStatus: req.body.feeStatus,
      feeDue: user.monthlyFee - req.body.amountPaid,
      advancedFee: req.body.advancedFee,
      totalAmount: user.monthlyFee - req.body.amountPaid - req.body.advancedFee
    });
    await fee.save();
    res.send(fee);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  try {
    const user = await Fee.findById(req.params.id);
    console.log(user);
    const fee = await Fee.findByIdAndUpdate(
      { _id: req.params.id },
      {
        feeMonth: req.body.feeMonth,
        amountPaid: req.body.amountPaid,
        feeStatus: req.body.feeStatus,
        feeDue: user.member.monthlyFee - req.body.amountPaid,
        advancedFee: req.body.advancedFee,
        totalAmount:
          user.member.monthlyFee - req.body.amountPaid - req.body.advancedFee
      },

      { new: true }
    );
    res.send(fee);
  } catch (error) {
    console.log(error);
  }
  //res.send("invalid id");
});
router.delete("/:id", async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    try {
      const fee = await Fee.findByIdAndDelete({ _id: req.params.id });
      if (!fee) return res.status(400).send("member not available");
      res.send(fee);
    } catch (error) {
      console.log(error);
    }
  }
  res.send("invalid id");
});

module.exports = router;
