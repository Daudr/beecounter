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
  host     : process.env.RDS_HOST || 'localhost',       // e memorizzate su Heroku
  user     : process.env.RDS_USER || 'root',            // Modificare questi campi per far si che ci si connetta al giusto database
  password : process.env.RDS_PASSWORD || '',            //
  database : process.env.RDS_DB || 'iot'                //
};

/**
* "api/query"
*   GET: End Point che contiente la query per ottenere tutti i dati della tabella beecounter del database
*        Da usare per costruire la tabella dell'app
*/

app.get("/api/query", (req, res, next) => {

  var connection = mysql.createConnection(connectionOptions);

  connection.query("SELECT DATE(ts_sens) AS `data`, DATE_FORMAT(ts_sens, '%H') AS `ora`, id_box, id_sens, SUM(beein) AS `in`, SUM(beeout) AS `out` "
                + "FROM beecounter "
                + "GROUP BY `data`, `ora`, id_box, id_sens",
                 (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });

  connection.end();
});

/**
* "api/query/:datada/:dataa"
*   GET: End Point che contiente la query per ottenere i dati della tabella beecounter in un intervallo di date che va `datada` a `dataa`
*        Da usare per costruire la tabella dell'app
*/

app.get("/api/query/:datada/:dataa", (req, res, next) => {
  var connection = mysql.createConnection(connectionOptions);

  connection.query("SELECT DATE(ts_sens) AS `data`, DATE_FORMAT(ts_sens, '%H') AS `ora`, id_box, id_sens, SUM(beein) AS `in`, SUM(beeout) AS `out` "
                    + "FROM beecounter "
                    + "GROUP BY `data`, `ora`, id_box, id_sens "
                    + "HAVING `data` BETWEEN ? AND ?",
                    [req.params.datada, req.params.dataa],
                    (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });

  connection.end();
});

/**
* "api/query/:data"
*   GET: End Point che contiente la query per ottenere i dati della tabella beecounter in una singola data `data`
*        Da usare per costruire la tabella dell'app
*/

app.get("/api/query/:data", (req, res, next) => {
  var connection = mysql.createConnection(connectionOptions);

  connection.query("SELECT DATE(ts_sens) AS `data`, DATE_FORMAT(ts_sens, '%H') AS `ora`, id_box, id_sens, SUM(beein) AS `in`, SUM(beeout) AS `out` "
                    + "FROM beecounter "
                    + "GROUP BY `data`, `ora`, id_box, id_sens "
                    + "HAVING `data` = ? ",
                    [req.params.data],
                    (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });

  connection.end();
});

/**
* "api/arniat/:arnia"
*   GET: End Point che contiente la query per ottenere i dati della tabella beecounter di una singola arnia `arnia`
*        Da usare per costruire la tabella dell'app
*/

app.get("/api/arniat/:arnia", (req, res, next) => {
  var connection = mysql.createConnection(connectionOptions);

  connection.query("SELECT DATE(ts_sens) AS `data`, DATE_FORMAT(ts_sens, '%H') AS `ora`, id_box, id_sens, SUM(beein) AS `in`, SUM(beeout) AS `out` "
                    + "FROM beecounter "
                    + "GROUP BY `data`, `ora`, id_box, id_sens "
                    + "HAVING id_box= ? ",
                   [req.params.arnia],
                    (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });

  connection.end();
});

/**
* "api/query/:sensore"
*   GET: End Point che contiente la query per ottenere i dati della tabella beecounter di un singolo sensore `sensore`
*        Da usare per costruire la tabella dell'app
*/

app.get("/api/sensoret/:sensore", (req, res, next) => {
  var connection = mysql.createConnection(connectionOptions);

  connection.query("SELECT DATE(ts_sens) AS `data`, DATE_FORMAT(ts_sens, '%H') AS `ora`, id_box, id_sens, SUM(beein) AS `in`, SUM(beeout) AS `out` "
                    + "FROM beecounter "
                    + "GROUP BY `data`, `ora`, id_box, id_sens "
                    + "HAVING id_sens = ? ",
                   [req.params.sensore],
                    (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });

  connection.end();
});

/**
* "api/graph"
*   GET: End Point che contiente la query per ottenere tutti i dati della tabella beecounter del database
*        Da usare per costruire il grafico dell'app
*/

app.get("/api/graph", (req, res, next) => {
  var connection = mysql.createConnection(connectionOptions);

  connection.query("SELECT DATE(ts_sens) AS `data`, SUM(beein) AS `in`, SUM(beeout) AS `out` from beecounter GROUP BY `data`", function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });

  connection.end();
});

/**
* "api/graph/:data"
*   GET: End Point che contiente la query per ottenere i dati della tabella beecounter in una singola data `data`
*        Da usare per il grafico dell'app
*/

app.get("/api/graph/:data", (req, res, next) => {
  var connection = mysql.createConnection(connectionOptions);

  connection.query("SELECT DATE(ts_sens) AS `data`, SUM(beein) AS `in`, SUM(beeout) AS `out` "
                   + "FROM beecounter "
                   + "GROUP BY `data` "
                   + "HAVING `data` = ?",
                   [req.params.data],
                   function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });

  connection.end();
});

/**
* "api/graph/:datada/:dataa"
*   GET: End Point che contiente la query per ottenere i dati della tabella beecounter in un intervallo di date `datada` e `dataa`
*        Da usare per il grafico dell'app
*/

app.get("/api/graph/:datada/:dataa", (req, res, next) => {
  var connection = mysql.createConnection(connectionOptions);

  connection.query("SELECT DATE(ts_sens) AS `data`, SUM(beein) AS `in`, SUM(beeout) AS `out` "
                   + "FROM beecounter "
                   + "GROUP BY `data` "
                   + "HAVING `data` BETWEEN ? AND ?",
                   [req.params.datada, req.params.dataa],
                   function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });

  connection.end();
});

/**
* "*"
*   GET: Invia l'index.html dell'app
*/

app.get('*', function(req, res, next){
	res.sendFile(distDir + '/index.html');
});

/**
* Metodo per far usare all'applicazione la porta dove ascoltare le richieste REST, 8080 se in ambiente di sviluppo
*/

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});
