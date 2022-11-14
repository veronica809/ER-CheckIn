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
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    symptoms: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    symptomsstartdate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    shortbreath: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    chestpain: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    triaged: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    covidexposed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    influenzaexposed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    tuberculosisexposed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    nursenotes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    diagnosis: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    discharged: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    dischargeddate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "patientlist",
    freezeTableName: true,
    timestamps: true,
    underscored: true,
  }
);

module.exports = Patientlist;
