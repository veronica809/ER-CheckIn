const router = require("express").Router();
const { logout } = require("../../controllers/users");
const userRoutes = require("./userRoutes");

router.use("/users", userRoutes);

router.get("/logout", logout);

module.exports = router;
