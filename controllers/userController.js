const bcrypt = require('bcryptjs');
const passport = require('passport');
let User = require('../models/user');

exports.register = function (req, res) {
    res.render('register');
}


exports.registerProcess = function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    let newUser = new User({
        username: username,
        password: password
    });

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            if (err) {
                console.log(err);
            }
            newUser.password = hash;
            newUser.save(function (err) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    res.redirect('/users/login');
                }
            });
        });
    });
};

exports.loginForms = function(req, res){
    res.render('login');
  };

// Login Process
exports.loginProcess = function(req, res, next){
    passport.authenticate('local', {
      successRedirect:'/programs/myprograms',
      failureRedirect:'/users/login',
      failureFlash: true
    })(req, res, next);
  };
  

//Logout
exports.logout = function(req, res){
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/users/login');
  };
  

