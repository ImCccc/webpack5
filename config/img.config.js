/*
  https://www.webpackjs.com/guides/asset-modules#inlining-assets
  https://www.webpackjs.com/plugins/image-minimizer-webpack-plugin/
  yarn add image-minimizer-webpack-plugin -D
  yarn add imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo -D
*/

// const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

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

  // optimization: {
  //   minimizer: [
  //     new ImageMinimizerPlugin({
  //       minimizer: {
  //         implementation: ImageMinimizerPlugin.imageminGenerate,
  //         options: {
  //           plugins: [
  //             ["gifsicle", { interlaced: true }],
  //             ["jpegtran", { progressive: true }],
  //             ["optipng", { optimizationLevel: 5 }],
  //             [
  //               "svgo",
  //               {
  //                 plugins: [
  //                   "preset-default",
  //                   "prefixIds",
  //                   {
  //                     name: "sortAttrs",
  //                     params: { xmlnsOrder: "alphabetical" },
  //                   },
  //                 ],
  //               },
  //             ],
  //           ],
  //         },
  //       },
  //     }),
  //   ],
  // },
};
