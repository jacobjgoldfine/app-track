const { Schema, model } = require("mongoose");
// const dateFormat = require("../utils/dateFormat");

const applicationSchema = new Schema({
  _id: {
    type: Number,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  // questionable?  Do we want to enter manual date or have it autopopulate?
  date_submitted: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  salary: {
    type: Number,
  },
  location: {
    type: String,
  },
  user_id: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Application = model("Application", applicationSchema);

module.exports = Application;
