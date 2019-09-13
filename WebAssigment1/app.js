const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');

mongoose.connect('mongodb://localhost/webAssigment1', { useNewUrlParser: true });
let db = mongoose.connection;

// Check for DB connection
db.once('open', function(){
    console.log('Connected to MongoDB');
});

//Check for DB errors
db.on('error', function(err){
    console.log(err)
});

//Init app
const app = express();

//Bring in models
let Exercise = require('./models/exercise');

//Load view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

//Set Public folder
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', function(req, res){
    res.render('index',{
        title:"Work out programs",
    });
});

//Add Route
app.get('/programs/add',function(req,res){
     res.render('add_exercise',{
         title:"Add Work out program"
     });
 });


let users = require('./routes/users');
app.use('/users', users);

//start server
app.listen(3000, function(){
    console.log('Server started on port 3000...');
});

