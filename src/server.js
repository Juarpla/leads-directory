const express = require("express");
const app = express();
require("dotenv").config();
const routes = require("./routes");
const swaggerRoutes = require("./routes/swaggerRoutes");
const database = require("./database");
const bodyParser = require("body-parser");
const responseConfig = require("./utils/responseConfig");

database.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Connected to MongoDB`);
  }
});

app.use(bodyParser.json());
app.use(responseConfig.setHeaders);
app.use("/", swaggerRoutes);
app.use("/", routes);

const port = process.env.PORT || 8080;
const host = process.env.HOST;

app.listen(port, () => {
  console.log(`Server listening on ${host}:${port}`);
});
