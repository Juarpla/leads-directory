const express = require("express");
const app = express();
require("dotenv").config();
const routes = require("./routes");

app.use("/", routes);

const port = process.env.PORT || 8080;
const host = process.env.HOST;

app.listen(port, () => {
  console.log(`Server listening on ${host}:${port}`);
});
