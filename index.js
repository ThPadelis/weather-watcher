const { getWeather } = require("./src/app");
var cron = require("node-cron");

cron.schedule("* * * * *", async () => {
  try {
    const weather = await getWeather();
    if (weather) {
      console.log({
        message: "Weather item saved",
        createdAt: Date.now(),
      });
    }
  } catch (error) {
    console.log({
      message: "Failed to save weather item",
      details: error.message,
      createdAt: Date.now(),
    });
  }

  console.log("======================");
});
