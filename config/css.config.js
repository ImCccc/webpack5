/*
  yarn add style-loader css-loader -D
  yarn add sass sass-loader -D
  yarn add less less-loader -D
  yarn add postcss-loader postcss postcss-preset-env -D
  yarn add mini-css-extract-plugin -D
  yarn add css-minimizer-webpack-plugin -D
*/

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const postcssLoader = {
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      plugins: ["postcss-preset-env"],
    },
  },
};

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // style-loader 在使用插件 mini-css-extract-plugin 后替换掉
          MiniCssExtractPlugin.loader,
          "css-loader",
          postcssLoader,
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          postcssLoader,
          "sass-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          postcssLoader,
          "less-loader",
        ],
      },
    ],
  },

  optimization: {
    // 压缩 css
    minimizer: [new CssMinimizerPlugin()],
  },

  plugins: [
    // 提取 css
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:5].css",
      chunkFilename: "css/chunk.[name].[hash:5].css",
    }),
  ],
};
