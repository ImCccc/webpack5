/*
  https://www.webpackjs.com/plugins/eslint-webpack-plugin/
  yarn add eslint-webpack-plugin eslint -D
*/

const path = require("path");
const EslintPlugin = require("eslint-webpack-plugin");

module.exports = {
  __ignore: true,
  plugins: [
    new EslintPlugin({
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules", // 默认值
      cache: true, // 开始缓存
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/eslintcache"
      ),
    }),
  ],
};
