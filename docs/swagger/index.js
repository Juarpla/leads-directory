const swaggerAutogen = require("swagger-autogen")();
require("dotenv").config();

const host =
  process.env.NODE_ENV === "production"
    ? "leads-directory.onrender.com"
    : "localhost:8080";

const schemes = process.env.NODE_ENV === "production" ? ["https"] : ["http"];

const doc = {
  info: {
    title: "Leads Directory API",
    description:
      "Welcome to Lead Directory! This is a Node.js application that allows you to manage leads.",
    version: "1.0.0",
  },
  host: host,
  schemes: schemes,
};

const outputFile = "./swagger/swagger.json";
const endpointsFile = ["../src/routes/index.js"];

swaggerAutogen(outputFile, endpointsFile, doc);
