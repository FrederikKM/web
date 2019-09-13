const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('./config/database');
const passport = require('passport');

mongoose.connect(config.database);
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

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(session({
  secret: 'love node',
  resave: true,
  saveUninitialized: true
}));

app.use(require('connect-flash')());

app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Bring in models
let Exercise = require('./models/exercise');

//Load view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

//Set Public folder
app.use(express.static(path.join(__dirname, 'public')));

  // Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

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

