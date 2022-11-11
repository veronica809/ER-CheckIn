const express = require("express");
const sequelize = require("./config/connection");
const path = require("path");
// const { application } = require("express");

const app = express();
const port = process.env.PORT || 3000;

// app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send(`Hello World!`);
});

sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});

// app.use(routes);

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
