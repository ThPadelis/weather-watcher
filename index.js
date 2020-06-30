const { getWeather } = require("./src/app");
const { logger } = require("./src/utils/logger");

// (async function () {
//   try {
//     const weather = await getWeather();
//     if (weather) {
//       console.info("Weather item saved");
//       logger.log({ level: "info", message: "Weather item saved" });
//     }
//   } catch (error) {
//     console.error("Failed to save weather item");
//     console.error({ error });
//   }
// })();

getWeather()
  .then((weather) => {
    if (weather) {
      console.log("getWeather() run successfully!");
      logger.info("getWeather() run successfully!");
    }
  })
  .catch((error) => {
    console.log("getWeather() failed to run");
    logger.info("getWeather() failed to run");
    logger.error({ error });
  })
  .finally(() => {
    console.log("Application run");
    logger.info("Application run");
    process.exit(0);
  });
