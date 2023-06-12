/*
  https://www.webpackjs.com/guides/asset-modules#inlining-assets
*/
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|git|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: { maxSize: 10 * 1024 }, // 10 kb 转 base64, 默认 8kb
        },
        // 修改打包目录 ，也可以通过 output.assetModuleFilename 配置
        // generator: { filename: "imgs/[hash:10][ext][query]" },
      },
    ],
  },
};
