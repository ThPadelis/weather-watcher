const { getWeather } = require("./src/app");
const cron = require("node-cron");

// cron.schedule("0 0 * * *", () => {
  getWeather()
    .then(item => {
      console.log("Item saved");
    })
    .catch(error => {
      console.log("Failed");
      console.log(error);
    });
// });
