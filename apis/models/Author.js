import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Author = sequelize.define('Author', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  bio: { type: DataTypes.TEXT },
  email: { type: DataTypes.STRING, unique: true },
  avatar: { type: DataTypes.STRING },
}, { timestamps: true });

export default Author;