const User = require("./user");
const Patientlist = require("./patientList");

User.hasMany(Patientlist, {
  as: "patientlist",
});
Patientlist.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

module.exports = {
  User,
  Patientlist,
};
