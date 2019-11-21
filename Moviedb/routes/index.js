var express = require('express');
var router = express.Router();
var pg = require('pg');
var deepEqual = require('deep-equal');
var session = require('express-session');
var massive = require("massive");
var connectionString = 'postgres://rliu040:8439L177Lr@@web0.site.uottawa.ca:15432/rliu040';
var db = massive.connectSync({
  connectionString: connectionString
});

//session part
var sess;
router.use(session({secret: 'ssshhhhh'}));

/*Get main page*/
router.get('/', function(req, res, next) {
  sess=req.session;
  sess.user_id;
  sess.email;
  sess.username;
  res.render('index', {
    nullinput: ''
  });
  res.end("yes");
});

/*Get sign up page*/
router.get('/signup', function(req, res, next) {
  res.render('signup');
  res.end("yes");
});
/*Get sign up page*/
router.get('/login_page', function(req, res, next) {
  res.render('login');
  res.end("yes");
});


/*Get sign up page*/
router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.render('index');
  res.end("yes");
});

/* Process login requests*/
router.post('/login', function(req, result, next) {

  var email = req.body.email;
  var password = req.body.passwordinput;
  //using massive to find password:
  db.moviedb.users.where("email=$1", [email], function(err, res) {

    if (err) {

      done();
      console.log(err);
      return result.status(500).json({
        success: false,
        data: err
      });
      result.send('log in failed', {
        nullinput: 'the pass word does not match'
      });
    }
    //if the email doesn't exist, redirect to login.

    if (res[0] == undefined) {
      console.log("the password does not matchsss");
      result.redirect('/');
      result.end("yes");
    } else {
      var check = res[0].password;
      check = check.replace(/\s+/g, '');
      if (check == password) {
        // The password is correct
        sess=req.session;
        sess.email=res[0].email;
        sess.username=res[0].first_name;
        sess.user_id=res[0].user_id;
        console.log(sess.username);
        console.log("the password is correct");
        result.redirect('/movie');
        result.end("yes");
      } else {
        //The password is in correct
        console.log("the password is incorrect");
        result.redirect('/');
        result.end();
      }
    }
  });
});



/* Process Signup requests*/
router.post('/sign_up_submit', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var first_name = req.body.First_Name;
  var last_name = req.body.Last_Name;
  // Get a Postgres client from the connection pool
  db.moviedb.users.insert({
    password: password,
    last_name: last_name,
    first_name: first_name,
    email: email
  }, function(err, result) {
    if (err) {
      console.log(err);
      console.log("an error happens");
      res.redirect('/');
    } else {
      sess=req.session;
      sess.email=result.email;
      sess.username=result.first_name;
      console.log(result);
      sess.user_id=result.user_id;
      var s="Sign up success";
      db.moviedb.profile.insert({user_id:result.user_id},function(err,profileresult){
        console.log(profileresult);
      });



      res.redirect('/movie');
      console.log(s);
    }
    res.end();
  });
});
/*   Sign up helper function*/
/*check if the email exists*/
router.post('/check_email_exists', function(req, result, next) {
  var email = req.body.email;
  //Go in to the database
  var decision = true;


  db.moviedb.users.where("email=$1", [email], function(err, res) {

    if (err) {
      done();
      console.log(err);
      return result.status(500).json({
        success: false,
        data: err
      });
    }
    var email_is_null = (res[0] == null);
    if (email_is_null) {
      // The password is correct
      console.log("This email address is ok");
      result.send('OK');
      return;
    } else {
      //The password is in correct
      console.log("This email address is not ok");
      result.send("not OK");
    }
  });
});


/*G*/

module.exports = router;
