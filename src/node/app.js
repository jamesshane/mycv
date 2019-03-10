const express = require("express");
const app = express();
const port = 3000;

var options = {
  index: "index.html"
};
app.get('/example/a', function (req, res) {
  res.send('Hello from A!')
})
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from B!')
})

var birds = require('./birds')
var sendgrid = require('./sendgrid')(app);

// ...

app.use('/', birds)


app.use("/", express.static("../../public",options));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
