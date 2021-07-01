const express = require('express');
const router = express.Router();
const controller = require('../controllers/personController')
const AuthMiddleware = require('../Middleware/auth')

router.use(AuthMiddleware)
 


module.exports = router;
