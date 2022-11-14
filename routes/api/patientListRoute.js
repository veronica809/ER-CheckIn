const { Patientlist } = require("../../models");
const { User } = require("../../models");

const router = require("express").Router();

// get all patients
router.get("/", async (req, res) => {
  try {
    const patientlist = await Patientlist.findAll({});
    res.status(200).json(patientlist);
  } catch (err) {
    res.status(400).json({ err, message: "Not found" });
  }
});

// get patient by id
router.get("/:patientlistId", async (req, res) => {
  try {
    const patientlist = await Patientlist.findOne({
      where: {
        id: req.params.patientlistId,
      },
      include: {
        model: User,
        as: "user",
        attributes: [
          "id",
          "username",
          "firstname",
          "lastname",
          "dob",
          "createdAt",
          "updatedAt",
        ],
      },
    });

    if (!Patientlist) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }
    res.status(200).json(patientList);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

//post new patient check in
router.post("/", async (req, res) => {
  console.log("reaching the backend route");
  console.log(req.body);
  try {
    await Patientlist.create({
      ...req.body,
      user_id: req.session.userId,
    });
    // res.status(201).json({ message: "Patient added to list" });
    res.redirect("/newpatient");
  } catch (err) {
    res.status(500).json(err);
  }
});

//put todo by id

//delete todo by id

router.post("/patientquestions", (req, res) => {
  console.log(req.body);
  res.json({ redirectRoute: "/patientquestions" });
});

module.exports = router;
