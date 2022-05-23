const report = require('multiple-cucumber-html-reporter');
/*
const fs = require("fs");
const path = require("path");

const args = process.argv;

const cucumberJsonDir = args[2] || "./cypress/reports/cucumber-json";
const screenshotsDir = args[3] || "./cypress/screenshots/ScenarioOutlines";
const videosDir = args[4] || "./cypress/videos/ScenarioOutlines";

const featureToFileMap = {};
const cukeMap = {};
const videosMap = {};
const jsonNames = {};

const jsonPath = path.join(__dirname, cucumberJsonDir);
const jsonPathMods = path.join(__dirname, cucumberJsonDir, 'modified');
const screenshotsPath = path.join(__dirname, screenshotsDir);
const videosPath = path.join(__dirname, videosDir);
const files = fs.readdirSync(jsonPath);
if (!fs.existsSync(jsonPathMods)) fs.mkdirSync(jsonPathMods);

const videos = fs.readdirSync(videosPath);
videos.forEach(vid => {
  const arr = vid.split(".");
  const featureName = `${arr[0]}.${arr[1]}`;
  videosMap[featureName] = vid;
});

files
  .filter(file => file.endsWith('.json'))
  .forEach(file => {
    const json = JSON.parse(
      fs.readFileSync(path.join(jsonPath, file)).toString()
    );
    const feature = json[0].uri.split("/").reverse()[0];
    jsonNames[feature] = file;
    cukeMap[feature] = json;
    featureToFileMap[feature] = file;
  });

const failingFeatures = fs.readdirSync(videosPath).map(feature => feature.replace('.mp4', ''));
failingFeatures.forEach(feature => {
  // find my video
  const vidData = fs
    .readFileSync(path.join(videosPath, videosMap[feature]))
    .toString("base64");
  if (vidData) {
    const html = `<video controls width="500"><source type="video/mp4" src="data:video/mp4;base64,${vidData}"> </video>`;
    const encodedHtml = Buffer.from(html, "binary").toString("base64");
    cukeMap[feature].forEach(scenario => {
      scenario.elements.forEach(element => {
        element.steps.forEach(step => {
          console.log('step', step)
          step.embeddings = step.embeddings || [];
          step.embeddings.push({data: html, mime_type: "text/html"});
        });
      });
    });
  }

  // write me back out again
  fs.writeFileSync(
    path.join(jsonPathMods, jsonNames[feature]),
    JSON.stringify(cukeMap[feature], null, 2)
  );
});
/**/

report.generate({
  jsonDir: './cypress/reports/cucumber-json', // /modified',
  reportPath: './cypress/reports/cucumber-html',
  metadata: {
    browser: {
      name: 'chrome',
      version: '101'
    },
    device: 'Local test machine',
    platform: {
      name: 'mac os',
      version: '12.3.1'
    }
  },
  customData: {
    title: 'Run info',
    data: [
      {label: 'Project', value: 'CADS - Cloud Apps Delivery System'},
      {label: 'Release', value: '1.0.0'},
      {label: 'Execution Start Time', value: 'May 12th 2022, 02:31 PM EST'},
      {label: 'Execution End Time', value: 'May 12th 2022, 02:32 PM EST'}
    ]
  }
});
