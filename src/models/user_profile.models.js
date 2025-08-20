import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const UserProfile = sequelize.define(
  'user_profiles',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: true
    },
    profile_picture_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  },
  {
    tableName: 'user_profiles',
    underscored: true
  }
);

export default UserProfile;
