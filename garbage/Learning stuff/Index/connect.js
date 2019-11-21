

var pg = require('pg');





var con='postgres://rliu040:8439L177Lr@@web0.site.uottawa.ca:15432/rliu040';
var client = new pg.Client(con);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SET SEARCH_PATH="movedb";', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log('hello');
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)

  });
  client.query('SELECT * FROM users', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[1]);

    var a=result.rows[1].password;


    var S = require('string');
    var b=S(a).strip(' ').s;
    console.log(b+".end");
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)

  });

});
