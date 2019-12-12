const express = require("express");
const router = express.Router();
const { Admin } = require("../models/signup");
const bcrypt = require("bcrypt");
const joi = require("joi");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const registered_user = await Admin.findOne({ email: req.body.email });
    if (!registered_user)
      return res.status(400).send("incorrect email or password");

    const validUser = await bcrypt.compare(
      req.body.password,
      registered_user.password
    );
    if (!validUser) return res.status(400).send("invalid user or password");
    const token = registered_user.Authentication();

    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(registered_user);
  } catch (ex) {
    console.error(ex);
  }
});

function validate(body) {
  const schema = {
    email: joi
      .string()
      .required()
      .email(),
    password: joi.string().required()
  };
  return joi.validate(body, schema);
}
module.exports = router;
