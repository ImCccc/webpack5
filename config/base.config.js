/*
  yarn add webpack webpack-cli -D
*/

const path = require("path");
const mode = process.env.NODE_ENV;
const isDev = mode === "development";
const devtool = isDev ? "cheap-module-source-map" : "source-map";

/** @type import("webpack").Configuration */
const config = {
  mode,
  devtool,
  entry: "/src/index.js",
  output: {
    path: path.join(__dirname, "../dist"),
    // 为什么使用 contenthash 不使用 hash, 是因为打包的时候，不改变的文件，不需要修改文件名称，上线后就可以缓存
    filename: "js/[name].[contenthash:10].js",
    // chunk 打包后目录
    chunkFilename: "js/chunk.[name].[contenthash:5].js",
    // 通过 loader 配置的，type: "asset"  打包目录
    assetModuleFilename: "imgs/[contenthash:5][ext][query]",
    // 每次构建删除原来的文件
    clean: true,
  },

  module: {
    rules: [
      // https://www.webpackjs.com/guides/asset-modules#inlining-assets
      {
        test: /\.(png|jpe?g|git|webp)$/,
        type: "asset",
        parser: {
          // 10 kb 转 base64, 默认 8kb
          dataUrlCondition: { maxSize: 10 * 1024 },
        },
        //可以通过 output.assetModuleFilename 配置
        // generator: { filename: "imgs/[hash:10][ext][query]" },
      },
      // 处理其他资源
      {
        test: /\.(woff2?|ttf)$/,
        type: "asset/resource",
      },
    ],
  },

  optimization: {
    // 代码分割配置
    // https://www.webpackjs.com/plugins/split-chunks-plugin/
    splitChunks: {
      chunks: "all",
    },

    // 缓存配置
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}.js`,
    },
  },
};

module.exports = config;
