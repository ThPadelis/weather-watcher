const mongoose = require("mongoose");
mongoose.Promise = Promise;
const axios = require("axios");
require("dotenv").config();
const moment = require("moment");
const { WeatherModel } = require("./models/Weather");
const { logger } = require("./utils/logger");
const { createRaw } = require("./utils/writeToFile");

(async () => {
  logger.info("Job started");
  try {
    const { data } = await axios.get(
      "http://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          appid: process.env.APP_KEY,
          id: 2791538,
          units: "metric"
        }
      }
    );

    logger.info("Data fetched from OpenWeatherMap API");

    const forecast = data.list.filter(item => {
      const now = moment().date();
      const dt = moment(item.dt_txt).date();
      if (now === dt) return item;
    });

    const file = {
      ...data,
      list: forecast,
      cnt: forecast.length
    };

    createRaw(file);

    try {
      const db = await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      logger.info("Connected to db");

      const weather = new WeatherModel(file);
      const saved = await weather.save();
      if (saved) logger.info("Record saved to db");
      else logger.error("Record failed to be saved");
    } catch (error) {
      logger.error("Failed to connect to db");
    }
  } catch (error) {
    logger.error("Failed to fetch data from OpenWeatherMap API");
    logger.error(JSON.stringify(error));
  }

  process.exit();
})().catch(error => {
  logger.error("Failed to started");
  logger.error(JSON.stringify(error));
});
