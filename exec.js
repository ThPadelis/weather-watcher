const { getWeather } = require("./src/app");
const cron = require("node-cron");
const { logger } = require("./src/utils/logger");

(async function () {
  try {
    const weather = await getWeather();
    if (weather) {
      console.log({
        message: "Weather item saved",
        createdAt: Date.now(),
        item: JSON.stringify(weather),
      });
    }
  } catch (error) {
    console.error({
      message: "Failed to save weather item",
      details: error.message,
      createdAt: Date.now(),
    });
  }
})();
