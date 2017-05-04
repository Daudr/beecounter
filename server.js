var express = require("express");
var bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const fs = require("fs");
const timeout = require("connect-timeout");

var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
app.use(cors());
app.use(timeout('30s'));

app.post("/api/connect", (req, res, next) => {
  const user = req.body.username;
  const password = req.body.password;

  console.log(req.body);

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

app.get("/api/query", (req, res, next) => {

  var connection = mysql.createConnection({
    host     : process.env.RDS_HOST || 'localhost',
    user     : process.env.RDS_USER || 'root',
    password : process.env.RDS_PASSWORD || '',
    database : process.env.RDS_DB || 'iot'
  });

  connection.query("SELECT DATE(ts_sens) AS `data`, id_box, id_sens, SUM(beein) AS `in`, SUM(beeout) AS `out` from beecounter GROUP BY `data`, id_box, id_sens", function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });

  connection.end();
});

app.get("/api/query/:datada/:dataa", (req, res, next) => {
  var connection = mysql.createConnection({
    host     : process.env.RDS_HOST || 'localhost',
    user     : process.env.RDS_USER || 'root',
    password : process.env.RDS_PASSWORD || '',
    database : process.env.RDS_DB || 'iot'
  });

  connection.query("SELECT DATE(ts_sens) AS `data`, id_box, id_sens, SUM(beein) AS `in`, SUM(beeout) AS `out`"
                    + "FROM beecounter"
                    + "WHERE `data` BETWEEN '" + datada + "' AND '" + dataa + "'"
                    + " GROUP BY `data`, id_box, id_sens",  (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });

  connection.end();
});

app.get("/api/query/:data", (req, res, next) => {
  var connection = mysql.createConnection({
    host     : process.env.RDS_HOST || 'localhost',
    user     : process.env.RDS_USER || 'root',
    password : process.env.RDS_PASSWORD || '',
    database : process.env.RDS_DB || 'iot'
  });

  connection.query("SELECT DATE(ts_sens) AS `data`, id_box, id_sens, SUM(beein) AS `in`, SUM(beeout) AS `out`"
                    + "FROM beecounter"
                    + "WHERE `data` = '" + data + "'"
                    + " GROUP BY `data`, id_box, id_sens",  (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });

  connection.end();
});

app.get("/api/query/:arnia", (req, res, next) => {
  var connection = mysql.createConnection({
    host     : process.env.RDS_HOST || 'localhost',
    user     : process.env.RDS_USER || 'root',
    password : process.env.RDS_PASSWORD || '',
    database : process.env.RDS_DB || 'iot'
  });

  connection.query("SELECT DATE(ts_sens) AS `data`, id_box, id_sens, SUM(beein) AS `in`, SUM(beeout) AS `out`"
                    + "FROM beecounter"
                    + "WHERE id_box=" + arnia
                    + "GROUP BY `data`, id_box, id_sens",  (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });

  connection.end();
});

app.get("/api/query/:sensore", (req, res, next) => {
  var connection = mysql.createConnection({
    host     : process.env.RDS_HOST || 'localhost',
    user     : process.env.RDS_USER || 'root',
    password : process.env.RDS_PASSWORD || '',
    database : process.env.RDS_DB || 'iot'
  });

  connection.query("SELECT DATE(ts_sens) AS `data`, id_box, id_sens, SUM(beein) AS `in`, SUM(beeout) AS `out`"
                    + "FROM beecounter"
                    + "WHERE id_sens=" + sensore
                    + "GROUP BY `data`, id_box, id_sens",  (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });

  connection.end();
});

app.get("/api/graph", (req, res, next) => {
  var connection = mysql.createConnection({
    host     : process.env.RDS_HOST || 'localhost',
    user     : process.env.RDS_USER || 'root',
    password : process.env.RDS_PASSWORD || '',
    database : process.env.RDS_DB || 'iot'
  });

  connection.query("SELECT DATE(ts_sens) AS `data`, SUM(beein) AS `in`, SUM(beeout) AS `out` from beecounter GROUP BY `data`", function (error, results, fields) {
    if (error) throw error;
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
