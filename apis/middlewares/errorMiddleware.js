export const notFound = (req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} introuvable` });
};

export const errorHandler = (err, req, res, next) => {
  console.error('[ERROR]', err);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Erreur serveur',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};