const express = require("express");
const app = express();

require("./startup/config")();
require("./startUp/database")();
require("./startUp/routes")(app);

let port = process.env.PORT || 3000;
app.listen(port, () => {
  return console.info(`listening to port ${port}...`);
});
