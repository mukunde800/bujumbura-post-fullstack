import { Category, Article } from '../models/index.js';
import slugify from '../utils/slugify.js';

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({ order: [['name', 'ASC']] });
    res.json(categories);
  } catch (err) { next(err); }
};

export const getCategoryBySlug = async (req, res, next) => {
  try {
    const category = await Category.findOne({
      where: { slug: req.params.slug },
      include: [{ model: Article, as: 'articles', where: { status: 'published' }, required: false }],
    });
    if (!category) return res.status(404).json({ message: 'Catégorie introuvable' });
    res.json(category);
  } catch (err) { next(err); }
};

export const createCategory = async (req, res, next) => {
  try {
    const data = { ...req.body };
    data.slug = data.slug || slugify(data.name);
    const category = await Category.create(data);
    res.status(201).json(category);
  } catch (err) { next(err); }
};

export const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: 'Catégorie introuvable' });
    const data = { ...req.body };
    if (data.name && !data.slug) data.slug = slugify(data.name);
    await category.update(data);
    res.json(category);
  } catch (err) { next(err); }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: 'Catégorie introuvable' });
    await category.destroy();
    res.json({ message: 'Catégorie supprimée' });
  } catch (err) { next(err); }
};