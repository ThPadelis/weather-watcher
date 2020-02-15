const mongoose = require("mongoose");
mongoose.Promise = Promise;
const axios = require("axios");
require("dotenv").config();
const fs = require("fs");
const moment = require("moment");
const { WeatherModel } = require("./models/Weather");
const cron = require("node-cron");

const job = cron.schedule("30 0 * * *", async () => {
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
      console.log("Connected to db");

      const weather = new WeatherModel(file);

      const saved = await weather.save();

      if (saved) console.log("Weather screenshot saved");
      else console.log("Failed to save screenshot to db");
    } catch (error) {
      console.log("Failed to connect to db");
    }
  } catch (error) {
    console.log(error);
  }
});
