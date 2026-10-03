import { Comment, User, Article } from '../models/index.js';

export const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'avatar'] },
        { model: Article, as: 'article', attributes: ['id', 'title', 'slug'] },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json(comments);
  } catch (err) { next(err); }
};

export const getCommentsByArticle = async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      where: { articleId: req.params.articleId, status: 'approved' },
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'avatar'] }],
      order: [['createdAt', 'DESC']],
    });
    res.json(comments);
  } catch (err) { next(err); }
};

export const createComment = async (req, res, next) => {
  try {
    const { content, guestName, guestEmail } = req.body;
    const comment = await Comment.create({
      content,
      articleId: req.params.articleId,
      userId: req.user?.id || null,
      guestName: req.user ? null : guestName,
      guestEmail: req.user ? null : guestEmail,
    });
    res.status(201).json(comment);
  } catch (err) { next(err); }
};

export const updateCommentStatus = async (req, res, next) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Commentaire introuvable' });
    await comment.update({ status: req.body.status });
    res.json(comment);
  } catch (err) { next(err); }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Commentaire introuvable' });
    await comment.destroy();
    res.json({ message: 'Commentaire supprimé' });
  } catch (err) { next(err); }
};