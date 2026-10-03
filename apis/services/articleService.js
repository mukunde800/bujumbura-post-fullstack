import { Op } from 'sequelize';
import { Article, Category, Author } from '../models/index.js';
import slugify from '../utils/slugify.js';

export const buildArticleQuery = (query) => {
  const { page = 1, limit = 10, category, search, status } = query;
  const where = { status: status !== undefined ? status : 'published' };
  if (category) where['$category.slug$'] = category;
  if (search) {
    where[Op.or] = [
      { title: { [Op.like]: `%${search}%` } },
      { excerpt: { [Op.like]: `%${search}%` } },
    ];
  }
  return {
    where,
    include: [
      { model: Category, as: 'category', attributes: ['id', 'name', 'slug', 'color'] },
      { model: Author, as: 'author', attributes: ['id', 'name', 'avatar'] },
    ],
    limit: +limit,
    offset: (+page - 1) * +limit,
    order: [['publishedAt', 'DESC']],
    distinct: true,
  };
};

export const generateUniqueSlug = async (title) => {
  const base = slugify(title);
  let slug = base;
  let i = 1;
  while (await Article.findOne({ where: { slug } })) slug = `${base}-${i++}`;
  return slug;
};