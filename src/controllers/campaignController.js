const campaignModel = require("../models/campaignModel");
const ObjectId = require("mongodb").ObjectId;

const campaignCont = {};

campaignCont.getAllCampaigns = async (req, res, next) => {
  //#swagger.tags=["Campaigns"]
  const response = await campaignModel.getAllCampaigns();
  if (response && response[0]?.name) {
    res
      .setHeader("Content-Type", "application/json")
      .status(200)
      .json(response);
  } else {
    res.status(400).json(
      response.error || {
        error: "No campaigns documents returned",
      },
    );
  }
};

campaignCont.saveCampaign = async (req, res) => {
  //#swagger.tags=["Campaigns"]
  const newCampaign = {
    name: req.body.name,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  };
  const response = await campaignModel.saveCampaign(newCampaign);
  if (response.insertedId) {
    res.status(201).json(response);
  } else {
    res.status(500).json(
      response.error || {
        error: "Create campaign response is not available, some error occurred",
      },
    );
  }
};

campaignCont.updateCampaign = async (req, res) => {
  //#swagger.tags=["Campaigns"]
  const campaignId = ObjectId.createFromHexString(req.params.id);
  const newCampaign = {
    name: req.body.name,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  };
  const response = await campaignModel.updateCampaign(newCampaign, campaignId);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(
      response.error || {
        error: "Update campaign response is not available, some error occurred",
      },
    );
  }
};

campaignCont.deleteCampaign = async (req, res) => {
  //#swagger.tags=["Campaigns"]
  const campaignId = ObjectId.createFromHexString(req.params.id);
  const response = await campaignModel.deleteCampaign(campaignId);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(
      response.error || {
        error: "Delete campaign response is not available, some error occurred",
      },
    );
  }
};

module.exports = campaignCont;
