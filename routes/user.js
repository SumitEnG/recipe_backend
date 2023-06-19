const express = require("express");
const userRoutes = express.Router();
const { User, validateUser } = require("../models/user");
const bcrypt = require("bcrypt");
const _ = require("lodash");

userRoutes.post("/signup", async (req, res) => {
  const result = validateUser(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  let user = await User.findOne({
    mail: req.body.mail,
  });
  if (user) {
    res.status(400).send("user already exist");
    return;
  }

  user = await User.findOne({
    name: req.body.name,
  });
  if (user) {
    res.status(400).send("user already exist");
    return;
  }

  user = new User(_.pick(req.body, ["name", "mail", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  const token = user.generateAuthTokens();
  res.header("x-auth-token", token).send(_.pick(user, ["name", "mail"]));
});

module.exports = userRoutes;
