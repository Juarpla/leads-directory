const express = require("express");
const app = express();
require("dotenv").config();
const routes = require("./routes");
const swaggerRoutes = require("./routes/swaggerRoutes");
const database = require("./database");
const bodyParser = require("body-parser");
const responseConfig = require("./utils/responseConfig");
const process = require("process");

database.initDb((err, _db) =>
  err ? console.error(err) : console.log("Connected to MongoDB"),
);

app.use(bodyParser.json());
app.use(responseConfig.setHeaders);
app.use("/", swaggerRoutes);
app.use("/", routes);

process.on("uncaughtException", (err, origin) => {
  const response = {
    Process: process.stderr.fd,
    "Caught exception": `${err.name}: ${err.message}`,
    "Exception origin": origin,
    "Stack trace": err.stack,
  };
  console.error("Uncaught Exception -> ", response);
});

const port = process.env.PORT || 8080;
const host = process.env.HOST;

app.listen(port, () => {
  console.log(`Server listening on ${host}:${port}`);
});
