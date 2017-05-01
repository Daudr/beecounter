var express = require("express");
var bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const fs = require("fs");

var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
app.use(cors());

/*app.post("/api/connect", (req, res, next) => {
  const user = req.body.username;
  const password = req.body.password;

  connection = mysql.createConnection({
    host     : process.env.RDS_HOST || 'localhost',
    user     : process.env.RDS_USER || 'root',
    password : process.env.RDS_PASSWORD || '',
    database : process.env.RDS_DB || 'iot'
  });

  connection.connect(() => {
    res.json({success: true});
  });
  console.log('connected to MySQL DB');
});*/

app.post("/api/query", (req, res, next) => {
  query = req.body.query;

  var connection = mysql.createConnection({
    host     : process.env.RDS_HOST || 'localhost',
    ssl  : "Amazon RDS",
    /*user     : process.env.RDS_USER || 'root',
    password : process.env.RDS_PASSWORD || '',*/
    database : process.env.RDS_DB /*|| 'iot'*/
  }, (err) => {
    if (err) throw err;
  };

  console.log(query);
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    console.log('metodo query');
    res.json(results);
  });

  connection.end();
});

/*app.post("/api/close", (req, res) => {
  connection.end(() => {
    res.send({closed: true});
  });
  console.log('connection ended');
})*/

app.get('*', function(req, res, next){
	res.sendFile(distDir + '/index.html');
});

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});
