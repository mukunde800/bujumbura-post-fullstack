import { Router } from 'express';
import * as ctrl from '../controllers/authorController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';

const router = Router();

router.get('/', ctrl.getAuthors);
router.get('/:id', ctrl.getAuthorById);

router.post('/', authenticate, authorize('admin', 'editor'), ctrl.createAuthor);
router.put('/:id', authenticate, authorize('admin', 'editor'), ctrl.updateAuthor);
router.delete('/:id', authenticate, authorize('admin'), ctrl.deleteAuthor);

export default router;