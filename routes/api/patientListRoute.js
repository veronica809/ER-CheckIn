const { Patientlist } = require("../../models");
const { User } = require("../../models");
const { checkAuth } = require("../../middlewares/authMiddleware");
const router = require("express").Router();

// get all patients
// router.use("/patientlist", checkAuth, patientList);

router.get("/", async (req, res) => {
  try {
    const patientlist = await Patientlist.findAll({});
    res.status(200).json(patientlist);
  } catch (err) {
    res.status(400).json({ err, message: "Not found" });
  }
});

// get patient by id
router.get("/:patientlistId", checkAuth, async (req, res) => {
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

router.get("/patient/:patientlistId", checkAuth, async (req, res) => {
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

//post new patient check in
router.post("/", async (req, res) => {
  var isolation = false;
  if (
    req.body.covidexposed ||
    req.body.influenzaexposed ||
    req.body.tuberculosisexposed
  ) {
    isolation = true;
    console.log("it's working");
  }
  var urgent = false;
  if (req.body.chestpain || req.body.shortbreath) {
    urgent = true;
  }

  console.log("reaching the backend route");
  console.log(req.body);
  try {
    await Patientlist.create({
      ...req.body,
      urgent: urgent,
      nursenotes: "Not Documented",
      isolationrequired: isolation,
      user_id: req.session.userId,
    });
    console.log("it is responding");
    // res.status(201).json({ message: "Patient added to list" });
    res.redirect("/newpatient");
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/nursenoteedit", async (req, res) => {
  console.log("the edit request is coming as:");
  console.log(req.body);
  try {
    if (req.body.edit === "true") {
      await Patientlist.update(
        {
          nursenotes: req.body.newNurseNote,
          nurseNoteEdit: false,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      ).then(function () {
        res.status(200).send("OK");
      });
    } else {
      await Patientlist.update(
        {
          nurseNoteEdit: true,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      ).then(function () {
        res.status(200).send("OK");
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/nursetriage", async (req, res) => {
  console.log("the edit request is coming as:");
  console.log(req.body);
  try {
    await Patientlist.update(
      {
        triaged: req.body.triaged,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    ).then(function () {
      res.status(200).send("OK");
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/discharge", async (req, res) => {
  console.log("the edit request is coming as:");
  console.log(req.body);
  try {
    await Patientlist.update(
      {
        discharged: req.body.discharged,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    ).then(function () {
      res.status(200).send("OK");
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//put todo by id

//delete todo by id

module.exports = router;
