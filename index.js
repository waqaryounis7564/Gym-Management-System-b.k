const express = require("express");
const app = express();
var cors = require("cors");

app.use(cors());
require("./startUp/database")();
require("./startUp/routes")(app);

let port = process.env.PORT || 900;
app.listen(port, () => {
  return console.info(`listening to port ${port}...`);
});
