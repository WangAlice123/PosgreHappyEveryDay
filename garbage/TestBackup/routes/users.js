var express = require('express');
var router = express.Router();
var pg = require('pg');
var deepEqual = require('deep-equal');
var massive = require("massive");
var connectionString = 'postgres://rliu040:8439L177Lr@@web0.site.uottawa.ca:15432/rliu040';
var db = massive.connectSync({
  connectionString: connectionString
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("am i hereeeeeee?");
  res.render('users');
  res.end("yes");
});

//Get user list
router.get('/get_user_list', function(req, res, next) {

  db.get_user_list(function(err, result) {
    console.log(result);
    res.send(result[0]);
  });

});

//Get movie list
router.get('/get_movie_list', function(req, res, next) {
  console.log("movie");
  db.get_movie_list(function(err, result) {
    console.log(result);
    res.send(result);
  });
});

//a
router.post('/get_movie', function(req, res, next) {

  console.log("get_moviejjjjjjjjj"+req.body.moviename);
  db.moviedb.movie.where("name=$1", [req.body.moviename], function(err, result) {
    console.log(result);
    res.send(result);
  });
});

//b
router.get('/get_actors_from_movie', function(req, res, next) {
  console.log(req.body.moviename);
  db.get_actors_from_movie([req.body.moviename],function(err, result) {
    console.log(result);
    res.send(result);
  });
  res.end("yes");
});
//c
router.get('/details_of_directors_and_studios', function(req, res, next) {
  console.log("actor and role");
  db.details_of_directors_and_studios([req.body.category],function(err, result) {
    console.log(result);
    res.send(result);
  });
  res.end("yes");
});
//d
router.get('/actor_appear_most', function(req, res, next) {
  console.log("movie");
  db.actor_appear_most(function(err, result) {
    console.log(result);
    res.send(result);
  });
  res.end("yes");
});
//e
router.get('/two_most_actors', function(req, res, next) {
  console.log("movie");
  db.two_most_actors(function(err, result) {
    console.log(result);
    res.send(result);
  });
  res.end("yes");
});
//f
router.get('/ten_highest_rating_movies', function(req, res, next) {
  console.log("movie");
  db.ten_highest_rating_movies(function(err, result) {
    console.log(result);
    res.send(result);
  });
  res.end("yes");
});
//g
router.get('/highest_rating_movie_and_topic', function(req, res, next) {
  console.log("movie");
  db.highest_rating_movie_and_topic(function(err, result) {
    console.log(result);
    res.send(result);
  });
  res.end("yes");
});
//h
router.get('/user_rating_number', function(req, res, next) {
  console.log("movie");
  db.user_rating_number(function(err, result) {
    console.log(result);
    res.send(result);
  });
  res.end("yes");
});
//i
router.get('/movie_not_rated_2016', function(req, res, next) {
  console.log("movie");
  db.movie_not_rated_2016(function(err, result) {
    console.log(result);
    res.send(result);
  });
  res.end("yes");
});
//j
router.get('/director_movie_lower', function(req, res, next) {
  console.log("movie");
  db.director_movie_lower(function(err, result) {
    console.log(result);
    res.send(result);
  });
  res.end("yes");
});
//k
router.get('/category_highest_movie', function(req, res, next) {
  console.log("category name");
  db.category_highest_movie([req.body.name], function(err, result) {
    console.log(result);
    res.send(result);
  });
  res.end("yes");
});
//l
router.get('/category_most_popular', function(req, res, next) {
  console.log("category name");
  db.category_most_popular([req.body.name], function(err, result) {
    console.log(result);
    res.send(result);
  });
  res.end("yes");
});
//m
router.get('/user_overall_rating', function(req, res, next) {
  console.log("category name");
  db.user_overall_rating([req.body.name], function(err, result) {
    console.log(result);
    res.send(result);
  });
  res.end("yes");
});
//n
router.get('/frequent_user', function(req, res, next) {
  console.log("category name");
  db.frequent_user([req.body.name], function(err, result) {
    console.log(result);
    res.send(result);
  });
  res.end("yes");
});
//o
router.get('/John_Smith', function(req, res, next) {
  console.log("category name");
  db.John_Smith([req.body.username], function(err, result) {
    console.log(result);
    res.send(result);
  });
  res.end("yes");
});
//p
router.get('/diverse_user', function(req, res, next) {
  console.log("category name");
  db.diverse_user([req.body.username], function(err, result) {
    console.log(result);
    res.send(result);
  });
  res.end("yes");
});
module.exports = router;
