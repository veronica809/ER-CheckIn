const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send(`Hello World! to http://localhost:${port}${req.url}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
