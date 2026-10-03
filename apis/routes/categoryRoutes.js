import { Router } from 'express';
import * as ctrl from '../controllers/categoryController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';

const router = Router();

router.get('/', ctrl.getCategories);
router.get('/:slug', ctrl.getCategoryBySlug);

router.post('/', authenticate, authorize('admin'), ctrl.createCategory);
router.put('/:id', authenticate, authorize('admin'), ctrl.updateCategory);
router.delete('/:id', authenticate, authorize('admin'), ctrl.deleteCategory);

export default router;