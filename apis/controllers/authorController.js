import { Author } from '../models/index.js';

export const getAuthors = async (req, res, next) => {
  try {
    const authors = await Author.findAll({ order: [['name', 'ASC']] });
    res.json(authors);
  } catch (err) { next(err); }
};

export const getAuthorById = async (req, res, next) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (!author) return res.status(404).json({ message: 'Auteur introuvable' });
    res.json(author);
  } catch (err) { next(err); }
};

export const createAuthor = async (req, res, next) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).json(author);
  } catch (err) { next(err); }
};

export const updateAuthor = async (req, res, next) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (!author) return res.status(404).json({ message: 'Auteur introuvable' });
    await author.update(req.body);
    res.json(author);
  } catch (err) { next(err); }
};

export const deleteAuthor = async (req, res, next) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (!author) return res.status(404).json({ message: 'Auteur introuvable' });
    await author.destroy();
    res.json({ message: 'Auteur supprimé' });
  } catch (err) { next(err); }
};