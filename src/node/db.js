var bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

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
  app.post("/testdb", urlencodedParser, function(req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var myobj = { name: "Company Inc", address: "Highway 37" };
      dbo.collection("visits").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
    });
    res.send(
      "OK:, " + req.body.namep + "," + req.body.emailp + "," + req.body.mesgp
    );
  });
};
