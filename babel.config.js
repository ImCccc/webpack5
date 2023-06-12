// https://babeljs.io/docs/babel-preset-env#corejs

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage", // core-js 按需加载
        corejs: 3,
      },
    ],
  ],
};
