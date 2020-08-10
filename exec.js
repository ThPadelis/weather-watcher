const { getWeather } = require("./src/app");
const cron = require("node-cron");
const { logger } = require("./src/utils/logger");

(async function(){
  try {
    const weather = await getWeather();
    if (weather) {
      logger.log({ level: "info", message: "Weather item saved" });
    }
  } catch (error) {
    logger.error("Failed to save weather item");
    logger.error(error);
  }
})();
