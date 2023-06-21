const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    min: 4,
    max: 20,
  },
  mail: {
    type: String,
    required: true,
    unique: true,
    min: 10,
    max: 30,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 300,
  },
  token: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateAuthTokens = async function () {
  const token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.jwtPrivateKey
  );
  this.token = token;
  await this.save();
  return token;
};

const User = new mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(4).max(20),
    mail: Joi.string().required().email().min(10).max(30),
    password: Joi.string().required().min(6).max(300),
  });

  return schema.validate(user);
}

module.exports.User = User;
module.exports.validateUser = validateUser;
module.exports.userSchema = userSchema;
