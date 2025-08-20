import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const Category = sequelize.define(
  'categories',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    color_code: {
      type: DataTypes.STRING(7), // Para códigos hex como #FF0000
      allowNull: true,
      defaultValue: '#808080'
    }
  },
  {
    tableName: 'categories',
    underscored: true
  }
);

export default Category;
