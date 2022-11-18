const router = require("express").Router();
const { Patientlist } = require("../models");
const { checkAuth } = require("../middlewares/authMiddleware");

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
router.get("/patientqueue", checkAuth, async (req, res) => {
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
router.get("/patientqueue/:patientlistId", checkAuth, async (req, res) => {
  try {
    console.log("reaching the route");
    console.log(req.params);
    const patientlist = await Patientlist.findOne({
      where: {
        id: req.params.patientlistId,
      },
    });

    if (!patientlist) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }
    console.log(patientlist.dataValues);
    res.render("patientview", patientlist.dataValues);
    // res.status(200).json(patientlist);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = router;
