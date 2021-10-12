const db = require("../config/connection");
const { User, Application } = require("../models");
const userSeeds = require("./user.json");
const appSeeds = require("./application.json");

db.once("open", async () => {
  try {
    // await User.deleteMany({});
    // await User.create(userSeeds);

    await Application.deleteMany({});
    await Application.create(appSeeds);

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
