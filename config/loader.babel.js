module.exports = {
  // __ignore: true,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          // 可以直接配置, 也可以通过配置文件
          // options: { presets: ["@babel/preset-env"] },
        },
      },
    ],
  },
};
