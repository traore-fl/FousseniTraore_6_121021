// IMPORTATIONS ----------
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const passwordValidation = require('../middleware/passwordValidation')

// ROUTES ----------
router.post('/signup', passwordValidation, userCtrl.signup);
router.post('/login', userCtrl.login);


// EXPORTATION ----------
module.exports = router;