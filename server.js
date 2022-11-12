const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const sequelize = require("./config/connection");
const path = require("path");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialize: true,
};
app.use(cookieParser());
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

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
