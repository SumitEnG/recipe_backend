const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect(process.env.dbUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("connected to db.."))
    .catch((err) => console.log(err.message));
};
