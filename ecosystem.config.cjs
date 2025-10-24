/* eslint-disable node/no-process-env */
require("dotenv").config();
const pjson = require("./package.json");

module.exports = {
  apps: [
    {
      name: `${pjson.name}:${process.env.PORT}`,
      port: Number.parseInt(process.env.PORT),
      exec_mode: "cluster",
      instances: "1",
      script: "./.output/server/index.mjs",
    },
  ],
};
