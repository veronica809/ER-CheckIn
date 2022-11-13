const { Patientlist } = require("../../models");
const { User } = require("../../models");

const router = require("express").Router();

// get all patients
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.findAll({});
    res.status(200).json(todos);
  } catch (err) {
    res.status(400).json({ err, message: "Not found" });
  }
});

// get patient by id
router.get("/:todoId", async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: {
        id: req.params.todoId,
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
    res.status(200).json(todo);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

//post new todo
router.post("/", async (req, res) => {
  console.log(req);
  try {
    await Patientlist.create({
      ...req.body,
      user_id: req.session.userId,
    });
    res.status(201).json({ message: "Todo Created" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//put todo by id

//delete todo by id

module.exports = router;
