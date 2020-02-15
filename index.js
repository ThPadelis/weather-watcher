const mongoose = require("mongoose");
mongoose.Promise = Promise;
const axios = require("axios");
require("dotenv").config();
const fs = require("fs");
const moment = require("moment");
const { WeatherModel } = require("./models/Weather");
const cron = require("node-cron");

// (async () => {
//   try {
//     const { data } = await axios.get(
//       "http://api.openweathermap.org/data/2.5/forecast",
//       {
//         params: {
//           appid: process.env.APP_KEY,
//           id: 2791538,
//           units: "metric"
//         }
//       }
//     );

//     const forecast = data.list.filter(item => {
//       const now = moment().date();
//       const dt = moment(item.dt_txt).date();
//       if (now === dt) return item;
//     });

//     const file = {
//       ...data,
//       list: forecast,
//       ctn: forecast.length
//     };

//     // Create directory if not exists
//     const weatherDir = "./weather";
//     if (!fs.existsSync(weatherDir)) {
//       fs.mkdirSync(weatherDir);
//     }

//     const today = moment().unix();
//     fs.writeFileSync(`./weather/${today}.json`, JSON.stringify(file, null, 2), {
//       encoding: "utf8"
//     });

//     try {
//       const db = await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//       });
//       console.log("Connected to db");

//       const weather = new WeatherModel(file);

//       const saved = await weather.save();

//       if (saved) console.log("Weather screenshot saved");
//       else console.log("Failed to save screenshot to db");
//     } catch (error) {
//       console.log("Failed to connect to db");
//     }

//     process.exit(1);
//   } catch (error) {
//     console.log(error);
//   }
// })();

const job = cron.schedule("@daily", async () => {
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

    // Create directory if not exists
    const weatherDir = "./weather";
    if (!fs.existsSync(weatherDir)) {
      fs.mkdirSync(weatherDir);
    }

    const today = moment().unix();
    fs.writeFileSync(`./weather/${today}.json`, JSON.stringify(file, null, 2), {
      encoding: "utf8"
    });

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
