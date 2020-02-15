const mongoose = require("mongoose");

const ItemMainSchema = mongoose.Schema({
  temp: Number,
  feels_like: Number,
  temp_min: Number,
  temp_max: Number,
  pressure: Number,
  sea_level: Number,
  grnd_level: Number,
  humidity: Number,
  temp_kf: Number
});

const ItemWeatherSchema = mongoose.Schema({
  id: Number,
  main: String,
  description: String,
  icon: String
});

const ItemCloudSchema = mongoose.Schema({ all: Number });
const ItemWindSchema = mongoose.Schema({ speed: Number, deg: Number });
const ItemSysSchema = mongoose.Schema({ pod: String });

const ItemSchema = mongoose.Schema({
  dt: Number,
  main: { type: ItemMainSchema },
  weather: [ItemWeatherSchema],
  clouds: { type: ItemCloudSchema },
  wind: { type: ItemWindSchema },
  sys: { type: ItemSysSchema },
  dt_txt: String
});

const ItemModel = mongoose.model("Item", ItemSchema);
const ItemMainModel = mongoose.model("ItemMain", ItemMainSchema);
const ItemWeatherModel = mongoose.model("ItemWeather", ItemWeatherSchema);
const ItemCloudModel = mongoose.model("Cloud", ItemCloudSchema);
const ItemWindModel = mongoose.model("Wind", ItemWindSchema);
const ItemSysModel = mongoose.model("Sys", ItemSysSchema);

module.exports = {
  ItemSchema,
  ItemModel,
  ItemMainSchema,
  ItemMainModel,
  ItemWeatherSchema,
  ItemWeatherModel,
  ItemCloudSchema,
  ItemCloudModel,
  ItemWindSchema,
  ItemWindModel,
  ItemSysSchema,
  ItemSysModel
};
