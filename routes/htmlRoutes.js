const router = require("express").Router();

// HTML ROUTES
// GET / - home page
router.get("/", (req, res) => {
  res.send("This is the homepage.");
});

module.exports = router;
