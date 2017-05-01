var express = require("express");
var bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
app.use(cors());

var connection;

app.post("/api/connect", (req, res, next) => {
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
});

app.post("/api/query", (req, res, next) => {
  query = req.body.query;
  console.log('host: ' + process.env.RDS_HOST + '\nuser: ' + process.env.RDS_USER + '\npassword: ' + process.env.RDS_PASSWORD);
  if (!connection) {
    connection = mysql.createConnection({
      host     : process.env.RDS_HOST || 'localhost',
      user     : process.env.RDS_USER || 'root',
      password : process.env.RDS_PASSWORD || '',
      database : process.env.RDS_DB || 'iot'
    });

    connection.connect();

    connection.query(query, function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    });

    connection.end();
  }
});

app.post("/api/close", (req, res) => {
  connection.end(() => {
    res.send({closed: true});
  });
  console.log('connection ended');
})

app.get('*', function(req, res, next){
	res.sendFile(distDir + '/index.html');
});

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});
