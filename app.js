const bodyParser = require('./node_modules/body-parser');
const express = require('express');
const path = require('path');
const expressValidator = require('express-validator');

const app = express();

/*Middleware example
const logger = function (req, res, next){
    console.log('Logging...');
    next();
}

app.use(logger);
*/

//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//set static Path
app.use(express.static(path.join(__dirname, 'public')))

//Global Vars
app.use(function(req, res, next){
    res.locals.errors = null;
    next();
});

//Express Validator Middleware
app.use(expressValidator()); 

var users = [
    {
        id: 1,
        first_name:'Jeff',
        last_name: 'Doe',
        email: 'jeffdoe@gmail.com',
    },
    {
        id: 2,
        first_name:'Jeff2',
        last_name: 'Doe2',
        email: 'jeffdoe2@gmail.com',
    },
    {
        id: 3,
        first_name:'Jeff3',
        last_name: 'Doe3',
        email: 'jeffdoe3@gmail.com',
    },
];

app.get('/', function(req, res){ 
    var title = 'Customers';
    res.render('index',{
        title: 'Customers',
        users: users,
    });
});

app.post('/users/add', function(req, res){
    
    req.checkBody('first_name', 'First name is required').notEmpty();
    req.checkBody('last_name', 'Last name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();

   var errors = req.validationErrors();

   if(errors)
   {
        res.render('index',{
            title: 'Customers',
            users: users,
            errors: errors
        });
        console.log('ERRORS');
   } 
   else
   {
        //console.log(req.body.last_name);
        var new_user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
        }
    console.log('SUCCSESS');
   }
    
});

app.listen(3000, function(){
    console.log('Server started on Port 3000... ');
});