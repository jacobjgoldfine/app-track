const { Schema, model } = require("mongoose");

const applicationSchema = new Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
  },
  salary: {
    type: String,
  },
  location: {
    type: String,
  },
  lane: {
    type: String,
    default: "Applied",
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Application = model("Application", applicationSchema);

module.exports = Application;
