function myFunction(){
var pg = require('pg');
var x = document.getElementById("frm1");

var client = new pg.Client({
    user: "rliu040",
    password: "",
    database: "rliu040",
    port: 15432,
    host: "web0.site.uottawa.ca",
    ssl: true
});





client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SET SEARCH_PATH="movedb";', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
  });
    //querys :1 set search path
    client.query('SET SEARCH_PATH="movedb";', function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
    });
    client.query('INSERT INTO USERS("password","last_name","first_name","email","city","province","country") VALUES('+x.elements[2]+','+x.elements[1]+','+x.elements[0]+','+x.elements[3]+','+x.elements[4]+','+x.elements[5]+','+x.elements[6]+');', function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
    });
    console.log(result.rows[0]);
    client.end();

});
}
