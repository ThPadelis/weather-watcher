const { Schema, model } = require("mongoose");
const { CitySchema } = require("./City");
const { ListITemSchema } = require("./ListItem");

const ItemSchema = Schema(
  {
    code: { type: Number },
    message: { type: String },
    city: { type: CitySchema },
    cnt: { type: Number },
    list: { type: [ListITemSchema] },
  },
  { timestamps: true, versionKey: false }
);

const ItemModel = model("Item", ItemSchema);

module.exports = { ItemSchema, ItemModel };
