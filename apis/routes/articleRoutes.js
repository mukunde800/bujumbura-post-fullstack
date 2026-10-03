import { Router } from 'express';
import * as ctrl from '../controllers/articleController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = Router();

router.get('/', ctrl.getArticles);
router.get('/:slug', ctrl.getArticleBySlug);

router.post(
  '/',
  authenticate,
  authorize('admin', 'editor', 'author'),
  upload.single('image'),
  ctrl.createArticle
);
router.put(
  '/:id',
  authenticate,
  authorize('admin', 'editor', 'author'),
  upload.single('image'),
  ctrl.updateArticle
);
router.delete('/:id', authenticate, authorize('admin', 'editor'), ctrl.deleteArticle);

export default router;