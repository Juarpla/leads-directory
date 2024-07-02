const router = require("express").Router();
const leadRoutes = require("./leadRoutes");
const companyRoutes = require("./companyRoutes");

router.get("/", (req, res) => {
  //#swagger.tags=["Welcome"]
  res.send("Welcome to Leads Directory Project");
});

router.use("/leads", leadRoutes);
router.use("/companies", companyRoutes);

module.exports = router;
