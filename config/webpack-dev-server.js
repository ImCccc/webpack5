/*
  yarn add webpack-dev-server -D
*/
module.exports = {
  devServer: {
    host: "localhost",
    port: 3000,
    open: true, // 自动打开浏览器
    hot: true, // 热模块更新 （默认true）
  },
};
