const router = require('express').Router();
import { join } from 'path';
import apiRoutes from './api';

router.use('/api', apiRoutes);

// serve up react front-end in production
router.use((req, res) => {
  res.sendFile(join(__dirname, '../../client/build/index.html'));
});

export default router;
