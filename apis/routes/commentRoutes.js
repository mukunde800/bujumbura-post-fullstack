import { Router } from 'express';
import * as ctrl from '../controllers/commentController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';

const router = Router();

router.get('/', authenticate, authorize('admin', 'editor'), ctrl.getAllComments);
router.get('/article/:articleId', ctrl.getCommentsByArticle);

// Commentaire public : on tente d'authentifier sans bloquer
router.post('/article/:articleId', (req, res, next) => {
  if (req.headers.authorization) return authenticate(req, res, next);
  next();
}, ctrl.createComment);

router.patch('/:id/status', authenticate, authorize('admin', 'editor'), ctrl.updateCommentStatus);
router.delete('/:id', authenticate, authorize('admin', 'editor'), ctrl.deleteComment);

export default router;