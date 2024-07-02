const mongodb = require("../database");

async function getAllLeads() {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("lead")
      .find({})
      .toArray();
    console.log("executed query: " + arguments.callee.name);
    return result;
  } catch (error) {
    return {
      error:
        "No lead collection found error: " +
        arguments.callee.name +
        ", " +
        error,
    };
  }
}

async function getLeadById(leadId) {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("lead")
      .find({ _id: leadId })
      .toArray();
    console.log("executed query: " + arguments.callee.name);
    return result;
  } catch (error) {
    return {
      error: "No lead found error: " + arguments.callee.name + ", " + error,
    };
  }
}

async function saveLead(newLead) {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("lead")
      .insertOne(newLead);
    console.log("executed query: " + arguments.callee.name);
    return result;
  } catch (error) {
    return {
      error: "Lead was not saved error " + arguments.callee.name + ", " + error,
    };
  }
}

async function updateLead(newLead, leadId) {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("lead")
      .replaceOne({ _id: leadId }, newLead);
    console.log("executed query: " + arguments.callee.name);
    return result;
  } catch (error) {
    return {
      error:
        "Lead was not updated error " + arguments.callee.name + ", " + error,
    };
  }
}

async function deleteLead(leadId) {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("lead")
      .deleteOne({ _id: leadId });
    console.log("executed query: " + arguments.callee.name);
    return result;
  } catch (error) {
    return {
      error:
        "Lead was not deleted error " + arguments.callee.name + ", " + error,
    };
  }
}

module.exports = {
  getAllLeads,
  getLeadById,
  saveLead,
  updateLead,
  deleteLead,
};
