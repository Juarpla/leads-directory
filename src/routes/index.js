const router = require("express").Router();
const leadRoutes = require("./leadRoutes");
const companyRoutes = require("./companyRoutes");
const authRoutes = require("./authRoutes");
const campaignRoutes = require("./campaignRoutes");
const tagRoutes = require("./tagRoutes");

router.get("/", (req, res) => {
  //#swagger.tags=["Home"]
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : "Logged Out",
  );
});
router.use("/", authRoutes);
router.use("/leads", leadRoutes);
router.use("/companies", companyRoutes);
router.use("/campaigns", campaignRoutes);
router.use("/tags", tagRoutes);

module.exports = router;
