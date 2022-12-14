const sequelize = require("../config/connection");
const { User, Patientlist } = require("../models");
const userSeeds = require("./user-seeds.json");
const patientList = require("./patientList.json");

const seedUsers = async () => {
  await sequelize.sync({ force: false });

  const users = await User.bulkCreate(userSeeds, {
    individualHooks: true,
    returning: true,
  });

  for (let patientlist of patientList) {
    await Patientlist.create({
      ...patientlist,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedUsers();
