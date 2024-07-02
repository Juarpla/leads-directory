const companyModel = require("../models/companyModel");

const companyCont = {};

companyCont.getAllCompanies = async (req, res, next) => {
  //#swagger.tags=["Companies"]
  const response = await companyModel.getAllCompanies();
  if (response && response[0]?.companyName) {
    return res
      .setHeader("Content-Type", "application/json")
      .status(200)
      .json(response);
  } else {
    res
      .status(400)
      .json(response.error || { error: "No companies documents returned" });
  }
};

module.exports = companyCont;
