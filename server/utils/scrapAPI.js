const parser = require("node-html-parser");

const scraperapiClient = require("scraperapi-sdk")("374454f9335b501f85e400cf27131120");

const ParseURLScrape = async (URL) => {
  const response = await scraperapiClient.get(URL);
  const root = parser.parse(response);

  const parsedData = {
    title: root.querySelector(".jobsearch-JobInfoHeader-title").rawText,
    company: root.querySelector(".jobsearch-InlineCompanyRating").firstChild.firstChild.innerHTML,
    local: root.querySelector(".jobsearch-JobInfoHeader-subtitle").lastChild.rawText,
    wage: root.querySelector(".jobsearch-JobMetadataHeader-item").firstChild.rawText,
    type: root.querySelector(".jobsearch-JobMetadataHeader-item").lastChild.rawText,
    fullDescription: root.querySelector("#jobDescriptionText").rawText,
  };

  return parsedData;
};

// addProfile: async (parent, { url }) => {
//   const data = await scrapAPI(url);
//   return Profile.create({ name });
// },

module.exports = ParseURLScrape;
