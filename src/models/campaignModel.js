const mongodb = require("../database");

async function getAllCampaigns() {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("campaign")
      .find({})
      .toArray();
    console.log("executed query: " + arguments.callee.name);
    return result;
  } catch (error) {
    return {
      error:
        "No campaign collection found error: " +
        arguments.callee.name +
        ", " +
        error,
    };
  }
}

async function saveCampaign(newCampaign) {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("campaign")
      .insertOne(newCampaign);
    console.log("executed query: " + arguments.callee.name);
    return result;
  } catch (error) {
    return {
      error:
        "Campaign was not saved error " + arguments.callee.name + ", " + error,
    };
  }
}

async function updateCampaign(newCampaign, campaignId) {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("campaign")
      .replaceOne({ _id: campaignId }, newCampaign);
    console.log("executed query: " + arguments.callee.name);
    return result;
  } catch (error) {
    return {
      error:
        "Campaign was not updated error " +
        arguments.callee.name +
        ", " +
        error,
    };
  }
}

async function deleteCampaign(campaignId) {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("campaign")
      .deleteOne({ _id: campaignId });
    console.log("executed query: " + arguments.callee.name);
    return result;
  } catch (error) {
    return {
      error:
        "Campaign was not deleted error " +
        arguments.callee.name +
        ", " +
        error,
    };
  }
}

module.exports = {
  getAllCampaigns,
  saveCampaign,
  updateCampaign,
  deleteCampaign,
};
