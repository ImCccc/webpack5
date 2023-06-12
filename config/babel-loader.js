/*
  yarn add babel-loader @babel/core @babel/preset-env -D
*/
module.exports = {
  __ignore: true,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true, // 开启缓存
            cacheCompression: false, // 关闭缓存文件压缩
          },
          // options: { presets: ["@babel/preset-env"] }, // 可以直接配置, 也可以通过配置文件
        },
      },
    ],
  },
};
