var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var filmRouter = require('./routes/films');

var app = express();

const requests = {};

app.use((req,res,next) =>{

    const request = req.method + " " + req.path; // req.method récupère la méthode HTTP (GET,POST,DELETE,...) et req.path récupère le chemin

    // request = "GET /users" 

    // { "GET /users" : 0, "POST /pizzas" : 4 } -> requests

    /*
    * Object.entries( requests ) permet de changer la string ci-dessus en un double tableau (clé/valeur) comme ci-dessous

    [
        [ "GET /users", 0 ],
        [ "POST /pizzas", 4 ]
    ]

    */

    if ( requests [ request ] === undefined ) {

        requests [ request ] = 1;

    } else {
        requests [ request ]++;
    }

    console.log('Request counter : ');

    const requestEntries = Object.entries(requests); 

    for(let i=0;i<requestEntries.length;i++){
        console.log('-\t' + requestEntries[i][0] + " : " + requestEntries[i][1] + "\n");
    }
    
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/films',filmRouter);

module.exports = app;
