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

  router.get('/myprograms', ensureAuthenticated, function(req, res){
        ExerciseProgram.find({creator : req.user._id}, function(err, programs){
            if(err){
                console.log(err);
            } else{
                res.render('index', {
                    programs : programs
                });
            }
        });
        /* let programs = ExerciseProgram.find({creator : req.user._id});
        console.log(programs);
        if(programs != null){
            res.render('my_programs', {
                programs : programs  
            });
        } */
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
          res.redirect('/programs/myprograms');
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