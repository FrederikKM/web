let {ExerciseProgram} = require('../models/exerciseProgram');
let {Exercise} = require('../models/exerciseProgram');

exports.addExercise =  function(req, res){
ExerciseProgram.find({creator : req.user._id}, function(err, programs){
  if(err){
      console.log(err);
  } else{
    console.log(programs);
    res.render('add_exercise', {
      title:'Add Exercise to program', 
      programs : programs
    });
  }
});
};

 exports.getProgramDetails = function(req, res){
  ExerciseProgram.findOne({_id : req.params.id}, function(err, program){
    if(err){
        console.log(err);
    } else{
      console.log(program);
        res.render('program_detail', {
          program : program
        });
    }
}); 
}


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
};

exports.createNewProgram =  function(req, res){
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

exports.createNewExercise = function(req, res){
  let exercise = new Exercise();
   exercise.name = req.body.Exercise;
   exercise.description = req.body.Description;
   exercise.set = req.body.Set;
   exercise.reps = req.body.Reps;

  ExerciseProgram.updateOne(
    {"_id" : req.body.program},
    {$push: {exercises : exercise}},
  function(err){
    if(err){
      console.log(err)
    } else{
      res.redirect('/programs/myprograms');
    }
  })
}


