const leadModel = require("../models/leadModel");
const ObjectId = require("mongodb").ObjectId;

const leadCont = {};

leadCont.getAllLeads = async (req, res, next) => {
  //#swagger.tags=["Leads"]
  const response = await leadModel.getAllLeads();
  if (response && response[0]?.firstName) {
    res
      .setHeader("Content-Type", "application/json")
      .status(200)
      .json(response);
  } else {
    res.status(400).json(
      response.error || {
        error: "No leads documents returned",
      },
    );
  }
};

leadCont.getLeadById = async (req, res, next) => {
  //#swagger.tags=["Leads"]
  const leadId = ObjectId.createFromHexString(req.params.id);
  const response = await leadModel.getLeadById(leadId);
  if (response && response[0]?.firstName) {
    res
      .setHeader("Content-Type", "application/json")
      .status(200)
      .json(response[0]);
  } else {
    res.status(400).json(
      response.error || {
        error: "No lead document returned",
      },
    );
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
  if (response.insertedId) {
    res.status(201).json(response);
  } else {
    res.status(500).json(
      response.error || {
        error: "Create Lead response is not available, some error occurred",
      },
    );
  }
};

leadCont.updateLead = async (req, res) => {
  //#swagger.tags=["Leads"]
  const leadId = ObjectId.createFromHexString(req.params.id);
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
  const response = await leadModel.updateLead(newLead, leadId);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(
      response.error || {
        error: "Update Lead response is not available, some error occurred",
      },
    );
  }
};

leadCont.deleteLead = async (req, res) => {
  //#swagger.tags=["Leads"]
  const leadId = ObjectId.createFromHexString(req.params.id);
  const response = await leadModel.deleteLead(leadId);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(
      response.error || {
        error: "Delete Lead response is not available, some error occurred",
      },
    );
  }
};

module.exports = leadCont;
