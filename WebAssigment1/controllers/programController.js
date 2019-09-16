let {ExerciseProgram} = require('../models/exerciseProgram');
// User Model
let User = require('../models/user');


// Add Route
exports.addExercise =  function(req, res){
    res.render('add_exercise', {
      title:'Add Exercise to program'
    })};

exports.addProgram = function(req, res){
        res.render('add_program', {
          title:'Create new program'
        })};
 

exports.getProgramsFromDb =  function(req, res){
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
};

exports.addNewProgram =  function(req, res){
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
    };
    

