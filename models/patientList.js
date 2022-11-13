const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Patientlist extends Model {}

Patientlist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "user",
    //     key: "id",
    //     onDelete: "cascade",
    //   },
    // },
  },
  {
    sequelize,
    modelName: "patient list",
    freezeTableName: true,
    timestamps: true,
    underscored: true,
  }
);

module.exports = Patientlist;
