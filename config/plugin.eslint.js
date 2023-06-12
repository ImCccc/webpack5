// yarn add eslint-webpack-plugin eslint -D

const EslintPlugin = require("eslint-webpack-plugin");
const path = require("path");

module.exports = {
  plugins: [
    new EslintPlugin({
      context: path.resolve(__dirname, "src"),
    }),
  ],
};
