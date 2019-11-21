var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
var routes = require('./routes');


app.set('view engine', 'ejs');


app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/signup', routes.signup);
app.get('/signup_submit',routes.signup_submit);

app.listen(3000, function() {
  console.log('App listening on port 3000!');
});
