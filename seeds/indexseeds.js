const sequelize = require("../connection");
const User = require("../models/user");
const userSeeds = require("./seeds/user-seeds.jason");

const seedUsers = async () => {
  await sequelize.sync({ force: true });

  await userSeeds.bulkCreate(userSeeds, {
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
};

seedUsers();
