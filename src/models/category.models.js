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
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    tableName: 'categories',
    underscored: true,
    defaultScope: {
      where: { is_deleted: false }
    },
    scopes: {
      all: { where: {} }
    }
  }
);

export default Category;
