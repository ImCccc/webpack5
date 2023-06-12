/*
  图片压缩配置, 不过没有成功过
  https://www.webpackjs.com/plugins/image-minimizer-webpack-plugin/
  yarn add image-minimizer-webpack-plugin -D
  yarn add imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo -D
*/
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  __ignore: true,
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: { xmlnsOrder: "alphabetical" },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },
};
