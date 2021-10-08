const parser = require("node-html-parser");

const scraperapiClient = require("scraperapi-sdk")("374454f9335b501f85e400cf27131120");

const ParseURLScrape = async () => {
  const response = await scraperapiClient.get(
    "https://www.indeed.com/viewjob?from=app-tracker-saved-appcard&hl=en&jk=c4720872bd2d52fc&tk=1fheh53qhu6ms800"
  );
  const root = parser.parse(response);
  const parsedData = {};

  console.log(root.querySelector(".jobsearch-JobInfoHeader-title"));
  return parsedData;
};

ParseURLScrape();

// addProfile: async (parent, { url }) => {
//   const data = await scrapAPI(url);
//   return Profile.create({ name });
// },
