var express = require('express');
var router = express.Router();
var pg = require('pg');
var session = require('express-session');
var deepEqual = require('deep-equal');
var massive = require("massive");
var connectionString = 'postgres://rliu040:8439L177Lr@@web0.site.uottawa.ca:15432/rliu040';
var db = massive.connectSync({
  connectionString: connectionString
});
/* GET users listing. */
var sess;
router.use(session({
  secret: 'ssshhhhh'
}));
router.get('/', function(req, res, next) {
  sess = req.session;
  console.log(sess.username);
  if (sess.email) {
    res.render('movie', {
      user: sess.username
    });
    res.end("yes");
  } else {
    res.redirect('/');
    res.end("yes");
  }
});

router.get('/user_profile', function(req, res, next) {
  sess = req.session;
  console.log(sess.username);
  if (sess.email) {
    res.render('user_profile', {
      user: sess.username
    });
    res.end("yes");
  } else {
    res.redirect('/');
    res.end("yes");
  }
});




router.post('/get_user', function(req, res, next) {
  //Go in to the database
  sess = req.session;
  db.get_user_by_email([sess.user_id], function(err, result) {
    //console.log(result);
    res.send(result);
  });
});

router.post('/update_user', function(req, res, next) {
  console.log(req.body);
  db.update_user([req.body.password, req.body.last_name, req.body.first_name, req.body.email, req.body.city, req.body.province, req.body.Country, sess.user_id], function(err, result) {
    console.log("a");
    console.log(result);
    console.log("b");
  });

  db.update_profile([req.body.age_range.replace(/\s+/g, ''), req.body.year_born, req.body.gender.replace(/\s+/g, ''), req.body.occupation, req.body.Device, sess.user_id], function(err, result) {
    console.log("c");
    console.log(result);
    console.log("d");
    if (err) {}
  });
  sess=req.session;
  sess.email = req.body.email;
  sess.username = req.body.first_name;

  res.render('user_profile', {
    user: sess.username
  });
});





module.exports = router;
