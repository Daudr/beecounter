var express = require("express");
var bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
app.use(cors());

app.post("/api/connect", (req, res, next) => {
  const user = req.body.username;
  const password = req.body.password;

  // var connection = mysql.createConnection('mysql://g1tqrf3wrwguf8ph:mheesbahhhj39dsq@jfrpocyduwfg38kq.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306/lcsryjrbsb5pz4m9');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : user,
    password : password,
    database : 'iot'
  });

  connection.connect(() => {
    res.json({success: true});
  });
  console.log('connected to MySQL DB');
});


/*
  connection.query('SELECT * from beecounter', function (error, results, fields) {
    if (error) throw error;
    for(i=0;i<10;i++){
      console.log('The solution is: ', results[i].id_dev, results[i].id_box);
    }
  });
*/

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
