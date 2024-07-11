const companyModel = require("../models/companyModel");
const ObjectId = require("mongodb").ObjectId;

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

companyCont.saveCompany = async (req, res) => {
  //#swagger.tags=["Companies"]
  const newCompany = {
    companyName: req.body.companyName,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    industry: req.body.industry,
    founded: req.body.founded,
    numberOfEmployees: Number(req.body.numberOfEmployees),
  };
  const response = await companyModel.saveCompany(newCompany);
  if (response.insertedId) {
    res.status(201).json(response);
  } else {
    res.status(500).json(
      response.error || {
        error: "Create company response is not available, some error occurred",
      },
    );
  }
};

companyCont.updateCompany = async (req, res) => {
  //#swagger.tags=["Companies"]
  const companyId = ObjectId.createFromHexString(req.params.id);
  const newCompany = {
    companyName: req.body.companyName,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    industry: req.body.industry,
    founded: req.body.founded,
    numberOfEmployees: Number(req.body.numberOfEmployees),
  };
  const response = await companyModel.updateCompany(newCompany, companyId);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(
      response.error || {
        error: "Update company response is not available, some error occurred",
      },
    );
  }
};

companyCont.deleteCompany = async (req, res) => {
  //#swagger.tags=["Companies"]
  const companyId = ObjectId.createFromHexString(req.params.id);
  const response = await companyModel.deleteCompany(companyId);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(
      response.error || {
        error: "Delete company response is not available, some error occurred",
      },
    );
  }
};

module.exports = companyCont;
