const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).send("ACCESS DENIED! no token provided");
  }

  try {
    const verifyUser = jwt.verify(token, process.env.jwtPrivateKey);
    console.log(verifyUser);
    next();
  } catch (ex) {
    res.status(400).send("invalid token");
  }
}

module.exports = auth;
