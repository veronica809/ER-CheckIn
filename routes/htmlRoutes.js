const router = require("express").Router();
const { Patientlist } = require("../models");

// HTML ROUTES
// GET / - home page
router.get("/", (req, res) => {
  res.render("index");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/register", (req, res) => {
  res.render("registerUser");
});
router.get("/newpatient", (req, res) => {
  res.render("patientQuestions");
});
router.get("/existingpatient", (req, res) => {
  res.render("existingpatient");
});
router.get("/patientqueue", async (req, res) => {
  try {
    const patientlist = await Patientlist.findAll({
      order: [["created_at", "DESC"]],
    });
    console.log(patientlist);
    res.render("patientQueue", { patientlist });
  } catch (err) {
    res.status(400).json({ err, message: "Not found" });
  }
});

module.exports = router;
