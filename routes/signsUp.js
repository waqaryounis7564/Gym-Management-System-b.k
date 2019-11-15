const express = require("express");
const router = express.Router();
const { Admin, validate } = require("../models/signup");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.send(admins);
  } catch (error) {
    console.log(error.message);
  }
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.send(error.details[0].message).status(400);
  try {
    const registeredAdmin = await Admin.findOne({ email: req.body.email });
    if (registeredAdmin) return res.send("admin already exist");

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashed = await bcrypt.hash(req.body.password, salt);

    const admin = await new Admin({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashed
    });
    await admin.save();
    res.send(admin);
    // const token = admin.Authentication();
    // res.header("x-auth-token", token).send(admin);
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = router;
