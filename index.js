const { getWeather } = require("./src/app");
const { logger } = require("./src/utils/logger");

(async function () {
  try {
    const weather = await getWeather();
    if (weather) {
      console.info("Weather item saved");
      logger.log({ level: "info", message: "Weather item saved" });
    }
  } catch (error) {
    console.error("Failed to save weather item");
    console.error({ error });
  }
})();
