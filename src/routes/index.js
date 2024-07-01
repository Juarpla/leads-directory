const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Welcome to Leads Directory Project");
});

module.exports = router;
