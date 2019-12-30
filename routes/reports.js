const express = require("express");
const router = express.Router();
const { Member } = require("../models/member");
const { Trainer } = require("../models/trainer");
const { Attendance } = require("../models/attendance");
const { Fee } = require("../models/fee");
const { Salary } = require("../models/salary");
const { Report } = require("../models/report");

router.get("/", async (req, res) => {
  let time = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit"
  });

  let feeAmount = n => {
    let sum = 0;
    for (let i = 0; i < n.length; i++) {
      sum += n[i].totalAmount;
    }
    return sum;
  };
  let salaryAmount = n => {
    let sum = 0;
    for (let i = 0; i < n.length; i++) {
      sum += n[i].salaryAmount;
    }
    return sum;
  };

  try {
    const member = await Member.find();
    const trainer = await Trainer.find();
    const attendances = await Attendance.find();
    const fees = await Fee.find();
    const salaries = await Salary.find();

    let report = new Report({
      members: member.length,
      trainers: trainer.length,
      availableTrainers: attendances.length,
      collectedFee: fees.length,
      remainingFee: member.length - fees.length,
      salaryPaid: salaries.length,
      remainingSalary: trainer.length - salaries.length,
      reportTime: time,
      credit: feeAmount(fees),
      debit: salaryAmount(salaries),
      totalAmount: feeAmount(fees) + salaryAmount(salaries)
    });

    await report.save();
    res.send(report);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
