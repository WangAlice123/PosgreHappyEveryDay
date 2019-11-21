var connectionString = 'postgres://rliu040:8439L177Lr@@web0.site.uottawa.ca:15432/rliu040';
var pg = require('pg');
var deepEqual = require('deep-equal');

//**************************************************************
//throw login page to the client
exports.index = function(req, res) {
  console.log("where am i");

    res.render('login');
  }
  //**************************************************************
  //throw sign up page to the client
exports.signup = function(req, res) {
  console.log("where am i signup");
  res.render('signup');
}


//**************************************************************
//processing login username and pw
exports.login = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  console.log(email + "***************" + password);

  if (email != "" && password != "") {
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
      // Handle connection errors

      if (err) {
        done();
        console.log(err);
        return res.status(500).json({
          success: false,
          data: err
        });
      }

      // SQL Query > Select Data
      client.query("SET SEARCH_PATH='movedb';");
      var q = "SELECT PASSWORD FROM USERS WHERE EMAIL='" + email + "';"



      client.query(q, function(err, result) {
        if (err) {
          return console.error('error running query', err);
        }

        /**
        if the password is correct, direct the user to user page:
        */
        var a = result.rows[0].password;
        var S = require('string');
        var b = S(a).strip(' ').s;
        if ([deepEqual(b, password)]) {
          console.log("*********Login successfully*****");
          // redirect the page to user's info page
          res.render('user');
          res.end("yes");
        } else {
          //print the message that login failed.

        }

        console.log("the password is" + result.rows[0].password);
      });
    });
  }
  else {
    //if no input for Username and pw, throw a new login page
    res.render('login');
  }
}
