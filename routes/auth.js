const express = require("express");
const authRoute = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const Joi = require("joi");

authRoute.post("/login", async (req, res) => {
  const result = validateUser(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  let user = await User.findOne({
    mail: req.body.mail,
  });
  if (!user) {
    res.status(400).send("invalid email or password");
    return;
  }

  const validpassword = bcrypt.compare(req.body.password, user.password);
  if (!validpassword) {
    res.status(400).send("invalid mail or password");
    return;
  }

  res.send(true);
});

function validateUser(user) {
  const schema = Joi.object({
    mail: Joi.string().required().min(10).max(30).email(),
    password: Joi.string().required().min(6).max(300),
  });
  return schema.validate(user);
}

module.exports = authRoute;
