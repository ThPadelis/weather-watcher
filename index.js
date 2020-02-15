const mongoose = require("mongoose");
mongoose.Promise = Promise;
const axios = require("axios");
require("dotenv").config();
const fs = require("fs");
const moment = require("moment");
const { WeatherModel } = require("./models/Weather");
const cron = require("node-cron");
const winston = require("winston");

const { TodoModel } = require("./models/Todo");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.label({ label: "WeatherWatcher" }),
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" })
  ]
});

const job = cron.schedule("42 0 * * *", async () => {
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

    // const { data } = await axios.get(
    //   "https://jsonplaceholder.typicode.com/todos/1"
    // );

    logger.info("Data fetched from OpenWeatherMap API");

    const forecast = data.list.filter(item => {
      const now = moment().date();
      const dt = moment(item.dt_txt).date();
      if (now === dt) return item;
    });

    const file = {
      ...data,
      list: forecast,
      ctn: forecast.length
    };

    try {
      const db = await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      logger.info("Connected to db");

      // const todo = new TodoModel(data);
      // const saved = await todo.save();
      // if (saved) logger.info("Record saved to db");
      // else logger.error("Record failed to be saved");

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
});
