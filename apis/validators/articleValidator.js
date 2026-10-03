export const validateArticle = (req, res, next) => {
  const { title, content, categoryId, authorId } = req.body;
  if (!title || !content || !categoryId || !authorId) {
    return res.status(400).json({ message: 'Titre, contenu, catégorie et auteur sont obligatoires' });
  }
  next();
};