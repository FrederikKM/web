let mongoose =require('mongoose');

//Program Schema
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

let Exercise = module.exports= mongoose.model('Exercise', exerciseSchema);

let ProgramSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    exercises:{type: [exerciseSchema]}
});

let Program = module.exports= mongoose.model('Program', ProgramSchema);