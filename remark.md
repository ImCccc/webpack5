## 环境变量

1. 安装

```
yarn add cross-env -D
```

2. 修改 `package.json`

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack server --config ./config/webpack.config.js",
    "prd": "cross-env NODE_ENV=production webpack --config ./config/webpack.config.js"
  }
}
```

3. 配置文件中使用 `webpack.config.js`

```js
console.log(process.env.NODE_ENV);
```

## SourceMap

原理： 生成一个 xxx.map 文件， 里面包含源码和构建后的代码的每一行每一列的对应关系；当构建后的代码在浏览器上出错了，可以帮助我们快速找到出错的位置

```js
module.exports = {
  mode: 'development' // production
  devtool: "cheap-module-source-map",
};
```

1. cheap-module-source-map
   开发模式使用， 精确到某一行

2. source-map
   生产模式使用， 精确到某一行某一列

## 热模块更新

```js
module.exports = {
  devServer: {
    hot: false, // 热模块更新 （默认true）
  },
};
```

## Rule.oneOf

[官网](<(https://www.webpackjs.com/configuration/module#ruleoneof)>)

规则数组，当规则匹配时，只使用第一个匹配规则。

## 开启缓存

1. babel

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            cacheCompression: false,
          },
        },
      },
    ],
  },
};
```

2. eslint

```js
const path = require("path");
const EslintPlugin = require("eslint-webpack-plugin");

module.exports = {
  plugins: [
    new EslintPlugin({
      context: path.resolve(__dirname, "../src"),
      cache: true,
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/eslintcache"
      ),
    }),
  ],
};
```

## 多进程打包

1. 安装

```
yarn add thread-loader -D
```

2. webpack5 配置

```js
const os = require("os");
const path = require("path");
const EslintPlugin = require("eslint-webpack-plugin");
const TerserPlugin = require("terset-webpack-plugin");

const threads = os.cpus().length; // cpu 核数

module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [
          // 多进程打包
          {
            loader: "thread-loader",
            options: { works: threads },
          },
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true, // 开启缓存
              cacheCompression: false, // 关闭缓存文件压缩
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
```

## css 压缩

1. 安装

```
yarn add css-minimizer-webpack-plugin -D
```

2. webpack5 配置

```js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
};
```

## Tree shaking

Tree shaking 是一个疏于， 意思是移除 js 中无用的代码， 它依赖 Es Module；
webpack 默认开启该功能

## 减少 babel 生成代码的体积

babel 对于一些公共方法没有做到很好的抽离， 默认情况下，会添加到使用该方法的每一个文件中，我们可以使用`@babel/plugin-transform-runtime`将公共方法单独抽离,它禁用了自动对每一个文件 runtime 注入，使所有辅助代码能够复用

1. 安装

```
yarn add babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime -D
```

2. webpack5 配置

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
};
```

## 动态导入

修改配置：

```js
module.exports = {
  optimization: {
    // 代码分割配置 https://www.webpackjs.com/plugins/split-chunks-plugin/
    splitChunks: {
      chunks: "all",
    },
  },
};
```

添加后， 发现`import("xxx.js").then(() => {});` 只有的语法，会单独打包成一个文件，引入 node_modules 的模块也会单独打包

```js
divDom.onclick = () => {
  import(/* webpackChunkName: "sum" */ "xxx.js").then((data) => {
    console.log(data.default);
  });
};
```

给打包输出的文件命名：

```js
// 使用
import(/* webpackChunkName: "sum" */ "./js/index.js");

// 配置
module.exports = {
  output: {
    path: "xxx",
    filename: "xxx",
    chunkFilename: "js/chunk.[name].[hash:5].js",
  },
};
```

修复报错： Parsing error: 'import' and 'export' may only appear at the top leveleslint

方式 1 使用 `@babel/eslint-parser`

```js
// yarn add @babel/eslint-parser -D
module.exports = {
  extends: ["eslint:recommended"],
  parser: "@babel/eslint-parser",
  ...
};
```

方式 2 添加 `plugins: ["import"],`：

```js
module.exports = {
  extends: ["eslint:recommended"],
  plugins: ["import"],
  ...
};
```

## Preload Prefetch

共同点：

1. 只会加载资源，不会执行；
2. 浏览器兼容性差；

不同点:

1. preload: 告诉浏览器马上加载资源；prefetch: 告诉浏览器空闲的时候才加载资源；
2. preload 优先级高，prefetch 低
3. prefetch 可以加载下一个页面的资源，preload 不可以

使用：

```js
/*
  yarn add @vue/preload-webpack-plugin -D
*/
const PreloadPlugin = require("@vue/preload-webpack-plugin");

module.exports = {
  plugins: [
    // new PreloadPlugin({
    //   rel: "prefetch",
    // }),
    new PreloadPlugin({
      rel: "preload",
      as: "script", // 优先级最高：style
    }),
  ],
};
```

## 打包缓存优化

打包的时候， 只修改一个 sum.js, 但是发现引用了改模块的 js 也跟着重新打包， 这一节我们修改配置来解决这个问题：

```js
module.exports = {
  output: {
    filename: "js/[name].[contenthash:10].js",
    chunkFilename: "js/chunk.[name].[contenthash:5].js",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}.js`,
    },
  },
};
```

注意点：

1. 为什么使用 contenthash 不使用 hash？是因为打包的时候，不改变的文件，不需要修改文件名称，上线后就可以缓存
2. 添加 runtimeChunk 配置

## core-js 解决兼容性问题

之前的 `babel-loader` 只能对箭头函数，点点点运算等转换， 不能解决类似于 Promise 数组的 includes 只有的 api, 下面使用 core-js 解决；

使用方式 1：直接使用 (体积很大)

```js
// yarn add core-js -D
import "core-js";
```

使用方式 2：按需加载 (收到引用太麻烦)

```js
import "core-js/es/promise";
```

使用方式 3：按需加载

修改配置 `babel.config.js`

```js
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
```
