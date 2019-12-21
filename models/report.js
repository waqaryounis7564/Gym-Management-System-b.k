const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  debit: { type: Number, required: true },
  credit: { type: Number, required: true },
  members: { type: Number, required: true },
  trainers: { type: Number, required: true },
  availableTrainers: { type: Number, required: true },
  collectedFee: { type: Number, required: true },
  remainingFee: { type: Number, required: true },
  remainingSalary: { type: Number, required: true },
  salaryPaid: { type: Number, required: true },
  reportTime: { type: String, required: true },
  totalAmount: { type: Number }
});
const report = mongoose.model("report", reportSchema);

exports.Report = report;
