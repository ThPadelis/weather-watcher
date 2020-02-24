const moment = require("moment");

function isSame(item) {
  const now = moment();
  const itemDate = moment(item.dt_txt);
  return now.isSame(itemDate, "date");
}

module.exports = { isSame };
