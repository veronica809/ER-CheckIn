const express = require("express");
const sequelize = require("./config/connection");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`Hello World!`);
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.log("DB connection failed");
    console.log(error);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
