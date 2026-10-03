import { Op } from 'sequelize';
import { Article, Category, Author, Comment, User } from '../models/index.js';
import slugify from '../utils/slugify.js';

const includeRelations = [
  { model: Category, as: 'category', attributes: ['id', 'name', 'slug', 'color'] },
  { model: Author, as: 'author', attributes: ['id', 'name', 'avatar'] },
];

export const getArticles = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category, search, status } = req.query;
    const where = {};
    where.status = status !== undefined ? status : 'published';
    if (category) where['$category.slug$'] = category;
    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { excerpt: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } },
      ];
    }
    const { rows, count } = await Article.findAndCountAll({
      where,
      include: includeRelations,
      order: [['publishedAt', 'DESC'], ['createdAt', 'DESC']],
      limit: +limit,
      offset: (+page - 1) * +limit,
      distinct: true,
    });
    res.json({ data: rows, total: count, page: +page, pages: Math.ceil(count / limit) || 1 });
  } catch (err) { next(err); }
};

export const getArticleBySlug = async (req, res, next) => {
  try {
    const article = await Article.findOne({
      where: { slug: req.params.slug },
      include: [
        ...includeRelations,
        {
          model: Comment, as: 'comments',
          where: { status: 'approved' }, required: false,
          include: [{ model: User, as: 'user', attributes: ['id', 'name', 'avatar'] }],
        },
      ],
    });
    if (!article) return res.status(404).json({ message: 'Article introuvable' });
    await article.increment('views');
    res.json(article);
  } catch (err) { next(err); }
};

export const createArticle = async (req, res, next) => {
  try {
    const data = { ...req.body };
    data.slug = data.slug || slugify(data.title);
    if (data.status === 'published' && !data.publishedAt) data.publishedAt = new Date();
    if (req.file) data.image = `/uploads/${req.file.filename}`;
    if (req.user) data.userId = req.user.id;
    const article = await Article.create(data);
    res.status(201).json(article);
  } catch (err) { next(err); }
};

export const updateArticle = async (req, res, next) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article introuvable' });
    const data = { ...req.body };
    if (data.title && !data.slug) data.slug = slugify(data.title);
    if (data.status === 'published' && !article.publishedAt) data.publishedAt = new Date();
    if (req.file) data.image = `/uploads/${req.file.filename}`;
    await article.update(data);
    res.json(article);
  } catch (err) { next(err); }
};

export const deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article introuvable' });
    await article.destroy();
    res.json({ message: 'Article supprimé' });
  } catch (err) { next(err); }
};