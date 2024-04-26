//const router = require('express').Router();
//import { join } from 'path';
//import apiRoutes from './api';

//router.use('/api', apiRoutes);

// serve up react front-end in production
//router.use((req, res) => {
  //res.sendFile(join(__dirname, '../../client/build/index.html'));});

//export default router;

const router = require('express').Router();
const path = require('path');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// Serve React static files
router.use(express.static(path.resolve(__dirname, '../../client/build')));

// For all other routes, serve the React app
router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
});

module.exports = router;
