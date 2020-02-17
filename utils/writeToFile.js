const path = require("path");
const fs = require("fs");

const dir = path.join(__dirname, "../raw");

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const createRaw = data => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const filename = year + "_" + month + "_" + day;
  fs.writeFileSync(
    path.join(dir, `${filename}_raw.json`),
    JSON.stringify(data, null, 2),
    { flag: "a" }
  );
};

module.exports = { createRaw };
