const express = require('express');
const router = express.Router();

let {ExerciseProgram} = require('../models/exerciseProgram');
// User Model
let User = require('../models/user');

// Add Route
router.get('/add/exercise', ensureAuthenticated, function(req, res){
    res.render('add_exercise', {
      title:'Add Exercise to program'
    });
  });

  router.get('/add/program', ensureAuthenticated, function(req, res){
    res.render('add_program', {
      title:'Create new program'
    });
  });

  router.post('/add/program', function(req, res){
    // Get Errors
    const name = req.body.program_field;

      let program = new ExerciseProgram();
        program.creator = req.user._id;
        program.name = name;

      program.save(function(err){
        if(err){
          console.log(err);
          return;
        } else {
          res.redirect('/');
        }
      });
    });

 function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      return next();
    } else {
      req.flash('danger', 'Please login');
      res.redirect('/users/login');
    }
  }

  module.exports = router;