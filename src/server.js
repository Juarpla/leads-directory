const express = require("express");
const app = express();
require("dotenv").config();
const routes = require("./routes");
const swaggerRoutes = require("./routes/swaggerRoutes");
const database = require("./database");
const bodyParser = require("body-parser");
const responseConfig = require("./utils/responseConfig");
const process = require("process");
const util = require("./utils");

database.initDb((err, _db) =>
  err ? console.error(err) : console.log("Connected to MongoDB"),
);

app.use(bodyParser.json());
app.use(responseConfig.setHeaders);
app.use("/", swaggerRoutes);
app.use("/", routes);
app.use(util.handleRoteError);

app.use(util.expressErrorHandler);
process.on("uncaughtException", util.handleUncaughtException);
process.on("unhandledRejection", util.handleUnhandledRejection);

const port = process.env.PORT || 8080;
const host = process.env.HOST;

app.listen(port, () => {
  console.log(`Server listening on ${host}:${port}`);
});
