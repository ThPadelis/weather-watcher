const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios");
const mongoose = require("mongoose");
const { ItemModel } = require("./models/Item");
const { logger } = require("./utils/logger");
const { isSame } = require("./utils/isSame");

function getWeather() {
  const baseURL = `https://api.openweathermap.org/data/2.5/forecast`;
  let rawData;

  return new Promise(async function (resolve, reject) {
    try {
      const response = await axios.get(baseURL, {
        params: {
          id: process.env.CITY_ID,
          appid: process.env.API_KEY,
          units: "metric",
        },
      });
      rawData = response.data;
      console.log({
        level: "info",
        message: "Data fetched from OpenWeatherMap API",
      });
    } catch (error) {
      console.log({
        level: "error",
        message: JSON.stringify(error, null, 2),
      });
      reject(error);
    }

    try {
      const db = await mongoose.connect(process.env.DB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log({
        level: "info",
        message: "Connected to MongoDB successfully",
      });

      const item = {
        ...rawData,
        list: rawData.list.filter((item) => isSame(item)),
        cnt: rawData.list.filter((item) => isSame(item)).length,
      };

      const savedItem = await new ItemModel(item).save();

      db.connection.close();
      console.log({
        level: "info",
        message: "Item saved to MongoDB successfully",
      });
      resolve(savedItem);
    } catch (error) {
      console.log({
        level: "error",
        message: JSON.stringify(error, null, 2),
      });
      reject(error);
    }
  });
}

module.exports = { getWeather };
