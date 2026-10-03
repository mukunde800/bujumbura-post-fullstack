import { User, Article, Comment } from '../models/index.js';

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
    });
    res.json(users);
  } catch (err) { next(err); }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
    });
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
    res.json(user);
  } catch (err) { next(err); }
};

export const createUser = async (req, res, next) => {
  try {
    const exists = await User.findOne({ where: { email: req.body.email } });
    if (exists) return res.status(400).json({ message: 'Email déjà utilisé' });
    const user = await User.create(req.body);
    const { password, ...safe } = user.toJSON();
    res.status(201).json(safe);
  } catch (err) { next(err); }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
    if (!req.body.password) delete req.body.password;
    await user.update(req.body);
    const { password, ...safe } = user.toJSON();
    res.json(safe);
  } catch (err) { next(err); }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
    await user.destroy();
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) { next(err); }
};

export const getStats = async (req, res, next) => {
  try {
    const [articles, categories, authors, users, comments] = await Promise.all([
      Article.count(),
      require('../models/index.js').Category.count(),
      require('../models/index.js').Author.count(),
      User.count(),
      Comment.count(),
    ]);
    const views = await Article.sum('views');
    res.json({ articles, categories, authors, users, comments, views: views || 0 });
  } catch (err) { next(err); }
};