const leadModel = require("../models/leadModel");

const leadCont = {};

leadCont.getAllLeads = async (req, res, next) => {
  //#swagger.tags=["Leads"]
  const leadsData = await leadModel.getAllLeads();
  if (leadsData[0].firstName) {
    return res
      .setHeader("Content-Type", "application/json")
      .status(200)
      .json(leadsData);
  } else {
    next(new Error("No leads document returned"));
  }
};

leadCont.saveLead = async (req, res) => {
  //#swagger.tags=["Leads"]
  const newLead = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    birthday: req.body.birthday,
    address: req.body.address,
    occupation: req.body.occupation,
    companyId: req.body.companyId,
  };
  const response = await leadModel.saveLead(newLead);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.Error ||
          "Create Lead response is not available, some error occurred",
      );
  }
};

module.exports = leadCont;
