/*
  yarn add eslint-webpack-plugin eslint -D
  yarn add babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime -D
  yarn add thread-loader -D
*/

const os = require("os");
const path = require("path");
const EslintPlugin = require("eslint-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const threads = os.cpus().length; // cpu 核数

module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [
          {
            // 多进程打包
            loader: "thread-loader",
            options: { works: threads },
          },
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true, // 开启缓存
              cacheCompression: false, // 关闭缓存文件压缩
              plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
            },
          },
        ],
      },
    ],
  },

  optimization: {
    minimizer: [
      new TerserPlugin({ parallel: threads }), // 压缩 js
    ],
  },

  plugins: [
    new EslintPlugin({
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules", // 默认值
      cache: true, // 开始缓存
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/eslintcache"
      ),
      threads, // 多进程打包
    }),
  ],
};
