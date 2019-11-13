const express = require("express");
const app = express();

require("./startup/config")();
require("./startup/database")();
require("./startup/routes")(app);

let port = process.env.PORT || 3000;
app.listen(port, () => {
  return console.info(`listening to port ${port}...`);
});
