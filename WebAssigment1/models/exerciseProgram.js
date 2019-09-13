let mongoose =require('mongoose');

//Exercise Schema
let exerciseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    set: {
        type: Number,
        required: true
    },
    reps:{
        type: String,
        required: true
    }

});


let ExerciseProgramSchema = mongoose.Schema({
    creator: {
        type: String,
        required: true
    },  
    name:{
        type: String,
        required: true
    },
    exercises:{type: [exerciseSchema]}
});

let program = mongoose.model('ExerciseProgram', ExerciseProgramSchema);
let exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = { ExerciseProgram: program, Exercise : exercise }