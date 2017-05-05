var express = require("express");
var bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
app.use(cors());

const connectionOptions = {                             // Per motivi di riservatezza le variabili di connessione al database sono segrete
  host     : process.env.RDS_HOST || 'localhost',       // Modificare questi campi per far si che ci si connetta al giusto database
  user     : process.env.RDS_USER || 'root',            //
  password : process.env.RDS_PASSWORD || '',            //
  database : process.env.RDS_DB || 'iot'                //
};

app.get("/api/query", (req, res, next) => {

  var connection = mysql.createConnection(connectionOptions);

  connection.query("SELECT DATE(ts_sens) AS `data`, id_box, id_sens, SUM(beein) AS `in`, SUM(beeout) AS `out` from beecounter GROUP BY `data`, id_box, id_sens", function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });

  connection.end();
});

app.get("/api/query/:datada/:dataa", (req, res, next) => {
  var connection = mysql.createConnection(connectionOptions);

  connection.query("SELECT DATE(ts_sens) AS `data`, id_box, id_sens, SUM(beein) AS `in`, SUM(beeout) AS `out`"
                    + "FROM beecounter"
                    + "WHERE `data` BETWEEN '" + req.params.datada + "' AND '" + req.params.dataa + "'"
                    + " GROUP BY `data`, id_box, id_sens",  (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });

  connection.end();
});

app.get("/api/query/:data", (req, res, next) => {
  var connection = mysql.createConnection(connectionOptions);

  connection.query("SELECT DATE(ts_sens) AS `data`, id_box, id_sens, SUM(beein) AS `in`, SUM(beeout) AS `out`"
                    + "FROM beecounter"
                    + "WHERE `data` = '" + req.params.data + "'"
                    + " GROUP BY `data`, id_box, id_sens",  (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });

  connection.end();
});

app.get("/api/arniat/:arnia", (req, res, next) => {
  var connection = mysql.createConnection(connectionOptions);

  connection.query("SELECT DATE(ts_sens) AS `data`, id_box, id_sens, SUM(beein) AS `in`, SUM(beeout) AS `out`"
                    + "FROM beecounter"
                    + "WHERE id_box=" + req.params.arnia
                    + "GROUP BY `data`, id_box, id_sens",  (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });

  connection.end();
});

app.get("/api/sensoret/:sensore", (req, res, next) => {
  var connection = mysql.createConnection(connectionOptions);

  connection.query("SELECT DATE(ts_sens) AS `data`, id_box, id_sens, SUM(beein) AS `in`, SUM(beeout) AS `out`"
                    + "FROM beecounter"
                    + "WHERE id_sens=" + req.params.sensore
                    + "GROUP BY `data`, id_box, id_sens",  (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });

  connection.end();
});

app.get("/api/graph", (req, res, next) => {
  var connection = mysql.createConnection(connectionOptions);

  connection.query("SELECT DATE(ts_sens) AS `data`, SUM(beein) AS `in`, SUM(beeout) AS `out` from beecounter GROUP BY `data`", function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });

  connection.end();
});

app.get('*', function(req, res, next){
	res.sendFile(distDir + '/index.html');
});

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});
