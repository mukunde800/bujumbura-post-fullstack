import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Article = sequelize.define('Article', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  excerpt: { type: DataTypes.STRING(500) },
  content: { type: DataTypes.TEXT('long'), allowNull: false },
  image: { type: DataTypes.STRING },
  status: { type: DataTypes.ENUM('draft', 'published', 'archived'), defaultValue: 'draft' },
  views: { type: DataTypes.INTEGER, defaultValue: 0 },
  publishedAt: { type: DataTypes.DATE },
  categoryId: { type: DataTypes.INTEGER, allowNull: false },
  authorId: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: true },
}, { timestamps: true });

export default Article;