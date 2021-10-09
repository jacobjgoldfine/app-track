const parser = require("node-html-parser");

const scraperapiClient = require("scraperapi-sdk")("374454f9335b501f85e400cf27131120");

// module.exports = {
const ParseURLScrape = async () => {
  const response = await scraperapiClient.get(
    "https://www.indeed.com/viewjob?from=app-tracker-saved-appcard&hl=en&jk=c4720872bd2d52fc&tk=1fheh53qhu6ms800"
  );
  const root = parser.parse(response);

  const parsedData = {
    title: root.querySelector(".jobsearch-JobInfoHeader-title").rawText,
    company: root.querySelector(".jobsearch-InlineCompanyRating").firstChild.firstChild.innerHTML,
    local: root.querySelector(".jobsearch-JobInfoHeader-subtitle").lastChild.rawText,
    wage: root.querySelector(".jobsearch-JobMetadataHeader-item").firstChild.rawText,
    type: root.querySelector(".jobsearch-JobMetadataHeader-item").lastChild.rawText,
    fullDescription: root.querySelector("#jobDescriptionText").rawText,
  };

  // console.log(root.querySelector(".jobsearch-JobInfoHeader-title"));
  // const jobTitleobj = root.querySelector(".jobsearch-JobInfoHeader-title").rawText;
  // const jobTitle = jobTitleobj.rawText;
  console.log(parsedData);
  // return parsedData;
};

// addProfile: async (parent, { url }) => {
//   const data = await scrapAPI(url);
//   return Profile.create({ name });
// },
ParseURLScrape();
