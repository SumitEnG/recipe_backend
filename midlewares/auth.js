const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
  const token = req.headers["token"];
  console.log(token);
  if (!token) {
    return res.status(401).send("ACCESS DENIED! no token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (ex) {
    res.status(400).send("invalid token");
  }
}

module.exports = auth;
