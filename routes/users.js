const express = require('express');
const router = express.Router();
//const bcrypt = require('bcryptjs');
//const passport = require('passport');
// Bring in User Model
//let User = require('../models/user');

var userController = require('../controllers/userController');

router.get('/register',userController.register);

// Register Proccess
router.post('/register', userController.registerProcess);

// Login Form
router.get('/login', userController.loginForms);
// Login Process
router.post('/login', userController.loginProcess);

// logout
router.get('/logout', userController.logout);

module.exports = router;