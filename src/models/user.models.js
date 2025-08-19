import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const User = sequelize.define(
  'user',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING(100),
        allowNull: false
    }
  },
  {
    // Other model options go here
  },
);