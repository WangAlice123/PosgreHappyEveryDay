var pg = require('pg');
var path = require('path');
var connectionString ='postgres://rliu040:@web0.site.uottawa.ca:15432/rliu040';

var client = new pg.Client(connectionString);
client.connect();
var query1 =client.query('SET SEARTH_PATH="movedb"');
var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', function() { client.end(); });
