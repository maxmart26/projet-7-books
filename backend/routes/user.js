const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);// route pour la création d'un utilisateur
router.post('/login', userCtrl.login);// route pour la connexion d'un utilisateur

module.exports = router;