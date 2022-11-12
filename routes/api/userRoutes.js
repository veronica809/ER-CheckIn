const router = require("express").Router();
const { response } = require("express");
const { getUsersByProfileName } = require("../../controllers/users");
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
    // req.session.save(() => {
    //   req.session.loggedIn = true;
    //   req.session.userId = user.user.dataValues.id;
    //   res.json(user);
    // });
    req.session.userId = user.dataValues.id;
    req.session.loggedIn = true;
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
  //send the user info back
});

router.get("/:profile", getUsersByProfileName);

module.exports = router;
