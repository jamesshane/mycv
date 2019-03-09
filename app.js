const express = require("express");
const app = express();
const port = 3000;

var options = {
  index: "index.html"
};

app.use("/", express.static("public",options));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
