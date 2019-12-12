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
    const member = await Member.findById(req.body.member_id);
    if (!member) return res.status(404).send("member not found");

    let fee = await new Fee({
      member: { name: member.name },
      feeMonth: req.body.feeMonth,
      feeAmount: req.body.feeAmount,
      feeStatus: req.body.feeStatus,
      feeDue: req.body.feeDue,
      advancedFee: req.body.advancedFee
    });
    await fee.save();
    res.send(fee);
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const member = await Member.findById(req.body.member_id);
    const fee = await Fee.findByIdAndUpdate(
      { _id: req.params.id },
      {
        member: { name: member.name },
        feeMonth: req.body.feeMonth,
        feeAmount: req.body.feeAmount,
        paid: req.body.paid,
        feeDue: req.body.feeDue,
        advancedFee: req.body.advancedFee
      },

      { new: true }
    );
    res.send(fee);
  } catch (error) {
    console.log(error);
  }
  res.send("invalid id");
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
