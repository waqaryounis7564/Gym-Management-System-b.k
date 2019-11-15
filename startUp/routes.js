const bodyParser = require("body-parser");
// const equipments = require("../routes/equipments");
const exercise = require("../routes/exercises");
const fee = require("../routes/fees");
const member = require("../routes/members");
// const signUp = require("../routes/signUp");
// const signIn = require("../routes/signIn");
// const report = require("../routes/reports");
const salary = require("../routes/salaries");
const trainer = require("../routes/trainers");
// const physicalRecord = require("../routes/physicalRecords");

module.exports = function(app) {
  app.use(bodyParser.json());
  // app.use("/equipment", equipments);
  app.use("/exercise", exercise);
  app.use("/fee", fee);
  app.use("/member", member);
  // app.use("/physicalRecord", physicalRecord);
  // app.use("/signup", signUp);
  // app.use("/signin", signIn);
  // app.use("/report", report);
  app.use("/salary", salary);
  app.use("/trainer", trainer);
};