require("express-async-errors");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());
require("./startup/db")();
require("./startup/routes")(app);

app.get("/", (req, res) => {
  res.send("<h1>working fine</h1>");
});

app.get("/uploads/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "uploads", filename);
  res.sendFile(filePath);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
