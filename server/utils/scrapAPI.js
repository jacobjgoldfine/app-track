const parser = require("node-html-parser");
require("dotenv").config();
const scraperapiClient = require("scraperapi-sdk")(process.env.SCRAPE);

const ParseURLScrape = async (URL) => {
  const response = await scraperapiClient.get(`${URL}`);
  const root = parser.parse(response);

  const parsedData = {
    jobTitle: root.querySelector(".jobsearch-JobInfoHeader-title")?.rawText,
    companyName: root.querySelector(".jobsearch-InlineCompanyRating")?.firstChild?.firstChild?.innerHTML,
    location: root.querySelector(".jobsearch-JobInfoHeader-subtitle")?.lastChild?.rawText,
    salary: root.querySelector(".jobsearch-JobMetadataHeader-item")?.firstChild?.rawText,
    // type: root.querySelector(".jobsearch-JobMetadataHeader-item")?.lastChild?.rawText,
    details: root.querySelector("#jobDescriptionText")?.rawText,
  };
  // console.log(parsedData);
  return parsedData;
};

module.exports = ParseURLScrape;

// ParseURLScrape(
//   "https://www.indeed.com/viewjob?from=app-tracker-saved-appcard&hl=en&jk=c4720872bd2d52fc&tk=1fhiojnncublc800"
// );
