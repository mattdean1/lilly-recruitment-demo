var express = require('express');
var router = express.Router();

var pg = require('pg');
pg.defaults.ssl = true;


/* GET home page. */
router.get('/', function(req, res) {
  var results = [];
     pg.connect(process.env.DATABASE_URL, function(err, client) {
       if (err) throw err;
       client
         .query('SELECT * FROM todo')
         .on('row', function(row) {
           results.push(row);
         })
         .on('end', function(){
           res.render('index', { list: results });
         });
     });
});

//insert new todo into database
router.post('/insert', function(req, res) {
  pg.connect(process.env.DATABASE_URL, function(err, client) {
     if (err) throw err;
     client
       .query('INSERT INTO todo (title, description) VALUES ($1, $2)', [req.body.title, req.body.description])
       .on('end', function(){
         res.send('success');
       });
   });
});

module.exports = router;
