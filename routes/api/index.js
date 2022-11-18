const router = require("express").Router();
const { logout } = require("../../controllers/users");
const { checkAuth } = require("../../middlewares/authMiddleware");
const userRoutes = require("./userRoutes");
const patientList = require("./patientListRoute");

router.use("/users", userRoutes);
//router.use("/patientlist", checkAuth, patientList);
router.use("/patientlist", patientList);

router.get("/logout", logout);

module.exports = router;
