const mongodb = require("../database");

async function getAllLeads() {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("lead")
      .find({})
      .toArray();
    console.log("executed query: " + getAllLeads.name);
    return result;
  } catch (error) {
    console.log(
      "No contact collection found error: " + getAllLeads.name + ", " + error,
    );
  }
}

async function saveLead(newLead) {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("lead")
      .insertOne(newLead);
    console.log("executed query: " + saveLead.name);
    return result;
  } catch (error) {
    console.error("Lead was not saved error " + saveLead.name + ", " + error);
  }
}

module.exports = {
  getAllLeads,
  saveLead,
};
