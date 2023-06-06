require("express-async-errors");
const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());
require("./startup/db")();
require("./startup/routes")(app);

app.get("/", (req, res) => {
  res.send("<h1>working fine</h1>");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
