const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const PoolController = require('../controllers/pool');

router.post('/', checkAuth, PoolController.pool_create_pool);
router.post('/match/:poolId', PoolController.pool_match_user);

module.exports =router;