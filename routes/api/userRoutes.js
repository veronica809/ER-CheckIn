const router = require("express").Router();
const { response } = require("express");
const { getUsersByProfileName } = require("../../controllers/users");
const { logIn } = require("../../controllers/users");
const User = require("../../models/User");

//POST/apiUsers - makes a new user
router.post("/", async (req, res) => {
  try {
    //get user data from the req.body
    const { username, password, profile, firstname, lastname, dob } = req.body;
    //create a new user
    const user = await User.create({
      username,
      password,
      profile,
      firstname,
      lastname,
      dob,
    });
    //add user info to the session
    req.session.userId = user.dataValues.id;
    req.session.loggedIn = true;
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

//POST/api/Users - logs user in
router.post("/login", async (req, res) => {
  try {
    //get user data from the req.body
    const { username, password, profile, firstname, lastname, dob } = req.body;
    //create a new user
    const user = await User.findOne({
      where: {
        username: username,
      },
    });
    //does the user exist?
    //no? send back  a 404
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    //is the password correct?
    const loginResult = await logIn(req, res);

    //add user info to the sessionun
    if (loginResult) {
      req.session.password = user.dataValues.password;
      req.session.loggedIn = true;
      res.status(201).json({ message: "Successful login" });
    } else {
      res.status(401).json({ message: "Invalid login" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
  //send the user info back
});

router.get("/:profile", getUsersByProfileName);

module.exports = router;
