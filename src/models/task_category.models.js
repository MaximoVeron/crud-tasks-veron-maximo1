import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const TaskCategory = sequelize.define(
  'task_categories',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tasks',
        key: 'id'
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      }
    },
    assigned_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'task_categories',
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['task_id', 'category_id']
      }
    ]
  }
);

export default TaskCategory;
