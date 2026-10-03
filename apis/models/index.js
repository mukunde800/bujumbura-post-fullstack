import sequelize from '../config/database.js';
import User from './User.js';
import Author from './Author.js';
import Category from './Category.js';
import Article from './Article.js';
import Comment from './Comment.js';

// Relations
Category.hasMany(Article, { foreignKey: 'categoryId', as: 'articles' });
Article.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

Author.hasMany(Article, { foreignKey: 'authorId', as: 'articles' });
Article.belongsTo(Author, { foreignKey: 'authorId', as: 'author' });

User.hasMany(Article, { foreignKey: 'userId', as: 'articles' });
Article.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Article.hasMany(Comment, { foreignKey: 'articleId', as: 'comments', onDelete: 'CASCADE' });
Comment.belongsTo(Article, { foreignKey: 'articleId', as: 'article' });

User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export { sequelize, User, Author, Category, Article, Comment };