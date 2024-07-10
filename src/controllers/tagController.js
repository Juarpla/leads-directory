const tagModel = require("../models/tagModel");
const ObjectId = require("mongodb").ObjectId;

const tagCont = {};

tagCont.getAllTags = async (req, res, next) => {
  //#swagger.tags=["Tags"]
  const response = await tagModel.getAllTags();
  if (response && response[0]?.name) {
    res
      .setHeader("Content-Type", "application/json")
      .status(200)
      .json(response);
  } else {
    res.status(400).json(
      response.error || {
        error: "No tags documents returned",
      },
    );
  }
};

tagCont.saveTag = async (req, res) => {
  //#swagger.tags=["Tags"]
  const newTag = {
    name: req.body.name,
    description: req.body.description,
  };
  const response = await tagModel.saveTag(newTag);
  if (response.insertedId) {
    res.status(201).json(response);
  } else {
    res.status(500).json(
      response.error || {
        error: "Create Tag response is not available, some error occurred",
      },
    );
  }
};

tagCont.updateTag = async (req, res) => {
  //#swagger.tags=["Tags"]
  const tagId = ObjectId.createFromHexString(req.params.id);
  const newTag = {
    name: req.body.name,
    description: req.body.description,
  };
  const response = await tagModel.updateTag(newTag, tagId);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(
      response.error || {
        error: "Update Tag response is not available, some error occurred",
      },
    );
  }
};

tagCont.deleteTag = async (req, res) => {
  //#swagger.tags=["Tags"]
  const tagId = ObjectId.createFromHexString(req.params.id);
  const response = await tagModel.deleteTag(tagId);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(
      response.error || {
        error: "Delete Tag response is not available, some error occurred",
      },
    );
  }
};

module.exports = tagCont;
