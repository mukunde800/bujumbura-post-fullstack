import { Router } from 'express';
import * as ctrl from '../controllers/userController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';

const router = Router();

router.use(authenticate, authorize('admin'));

router.get('/', ctrl.getUsers);
router.get('/stats/overview', ctrl.getStats);
router.get('/:id', ctrl.getUserById);
router.post('/', ctrl.createUser);
router.put('/:id', ctrl.updateUser);
router.delete('/:id', ctrl.deleteUser);

export default router;