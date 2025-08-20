import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const Task = sequelize.define(
  'tasks',
  {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    is_complete: {
        type:DataTypes.BOOLEAN,
        defaultValue: false,
    }
  },
  {
    // Other model options go here
  },
);

export default Task;
