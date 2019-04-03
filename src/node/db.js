var bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
var sms = require( './sendsms' );

var request = require('request');
var cheerio = require('cheerio');

//var app = express()
module.exports = function(app) {
  app.get("/marky", function(req, res) {
    res.write("I am a new route");
    res.end();
  });

  // create application/json parser
  var jsonParser = bodyParser.json();

  // create application/x-www-form-urlencoded parser
  var urlencodedParser = bodyParser.urlencoded({ extended: false });

  // POST /login gets urlencoded bodies
  app.post("/insertvisit", urlencodedParser, function(req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var myobj = req.body;//{ name: "Company Inc", address: "Highway 37" };
      sms.sendsms(req.body.path+" was visited from "+req.body.city+", "+req.body.region);
      dbo.collection("visits").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
    });
    res.send(
      "OK:, " + req.body.ip
    );
  });

  app.get("/getinfo", urlencodedParser, function(req,res) {
    //request('https://ipinfo.io/json', function (error, response, html) {
      //if (!error && response.statusCode == 200) {
        //console.log(html);
        res.send("not used");
      //}
    //});
  });
};
