/*
  yarn add @vue/preload-webpack-plugin -D
*/
const PreloadPlugin = require("@vue/preload-webpack-plugin");

module.exports = {
  plugins: [
    // new PreloadPlugin({
    //   rel: "prefetch",
    // }),
    new PreloadPlugin({
      rel: "preload",
      as: "script", // 优先级最高：style
    }),
  ],
};
