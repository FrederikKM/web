const express = require('express');
const router = express.Router();
var programController = require('../controllers/programController');


//let {ExerciseProgram} = require('../models/exerciseProgram');
router.get('/add/exercise',ensureAuthenticated,programController.addExercise);

router.get('/add/program',ensureAuthenticated ,programController.addProgram);

router.get('/myprograms',ensureAuthenticated ,programController.getProgramsFromDb);

router.post('/add/program',  ensureAuthenticated ,programController.addNewProgram);


function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/users/login');
  }
}
module.exports = router;