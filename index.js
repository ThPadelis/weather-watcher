const { getWeather } = require("./src/app");
const cron = require("node-cron");

getWeather()
  .then(item => {
    console.log("Item saved");
  })
  .catch(error => {
    console.log("Failed");
    console.log(error);
  });
