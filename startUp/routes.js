const bodyParser = require("body-parser");
const equipments = require("../routes/equipments");
const exercise = require("../routes/exercises");
const fee = require("../routes/fees");
const member = require("../routes/members");
const signUp = require("../routes/signsUp");
const signIn = require("../routes/signIn");
const attendance = require("../routes/attendances");
const report = require("../routes/reports");
const salary = require("../routes/salaries");
const trainer = require("../routes/trainers");
const physicalRecord = require("../routes/physicalRecords");
const registerService = require("../routes/registerServices");

module.exports = function(app) {
  app.use(bodyParser.json());
  app.use("/equipment", equipments);
  app.use("/exercise", exercise);
  app.use("/fee", fee);
  app.use("/member", member);
  app.use("/physicalRecord", physicalRecord);
  app.use("/signup", signUp);
  app.use("/signin", signIn);
  app.use("/attendance", attendance);
  app.use("/report", report);
  app.use("/salary", salary);
  app.use("/trainer", trainer);
  app.use("/registerService", registerService);
};
