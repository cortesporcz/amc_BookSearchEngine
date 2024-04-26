const router = require('express').Router();
import userRoutes from './user-routes';

router.use('/users', userRoutes);

export default router;
