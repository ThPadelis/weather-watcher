const { getWeather } = require("./src/app");
var cron = require("node-cron");

cron.schedule("0 0 * * *", async () => {
  try {
    const weather = await getWeather();
    if (weather) {
      console.info("Weather item saved");
      console.log({ level: "info", message: "Weather item saved" });
    }
  } catch (error) {
    console.error("Failed to save weather item");
    console.error({ error });
  }
});
