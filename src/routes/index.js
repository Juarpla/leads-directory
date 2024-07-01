const router = require("express").Router();
const leadRoutes = require("./leadRoutes");

router.get("/", (req, res) => {
  //#swagger.tags=["Welcome"]
  res.send("Welcome to Leads Directory Project");
});

router.use("/leads", leadRoutes);

module.exports = router;