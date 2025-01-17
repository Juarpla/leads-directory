const express = require("express");
const router = new express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../docs/swagger/swagger.json");

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

module.exports = router;
