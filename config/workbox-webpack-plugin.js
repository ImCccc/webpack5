const WorkboxPlugin = require("workbox-webpack-plugin");

/** @type import("webpack").Configuration */
const config = {
  plugins: [
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};

module.exports = config;
