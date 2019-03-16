var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

//var app = express()
module.exports = function(app) {
  // POST /login gets urlencoded bodies
  app.get("/seevisits", function(req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var mysort = { _id: -1 };
      dbo
        .collection("visits")
        .find({}, { projection: { _id: 0, created: 1, path: 1, city:1, region:1 } })
        .sort(mysort)
        .toArray(function(err, result) {
          if (err) throw err;
          res.send(result);
          db.close();
        });
    });
  });
};
