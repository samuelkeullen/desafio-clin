const express = require('express');
const router = express.Router();
const controller = require('../controllers/personController')


//User Router

router.post("/signup", controller.registration);
router.post('/login', controller.login);

module.exports = router;