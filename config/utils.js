const fs = require("fs");
let config = require("./base.config");

const isNull = (v) => v === undefined || v === null;
const isArray = (v) => Object.prototype.toString.call(v) === "[object Array]";
const isObject = (v) => Object.prototype.toString.call(v) === "[object Object]";
const isBaseType = (v) => ["string", "number", "boolean"].includes(typeof v);

const mergeOptions = (option1, option2) => {
  const keys = [...new Set([...Object.keys(option1), ...Object.keys(option2)])];

  keys.forEach((key) => {
    const v1 = option1[key];
    const v2 = option2[key];

    if (isNull(v2)) return;
    if (isNull(v1)) return (option1[key] = v2);

    const v1IsBaseType = isBaseType(v1);
    const v2IsBaseType = isBaseType(v2);

    const v1IsArray = isArray(v1);
    const v2IsArray = isArray(v2);

    const v1IsObject = isObject(v1);
    const v2IsObject = isObject(v2);

    // 基本类型合并， option2 覆盖 option1
    if (v1IsBaseType && v2IsBaseType) {
      option1[key] = v2;
      return;
    }

    // v1 是数组， v2 是基本类型 或者 对象
    if (v1IsArray && (v2IsBaseType || v2IsObject)) {
      v1.push(v2);
      option1[key] = v1;
      return;
    }

    // v2 是数组， v1 是基本类型 或者 对象
    if (v2IsArray && (v1IsBaseType || v1IsObject)) {
      v2.push(v1);
      option1[key] = v2;
      return;
    }

    // 都是数组
    if (v1IsArray && v2IsArray) {
      option1[key] = [...v1, ...v2];
      return;
    }

    // 都是对象
    if (v1IsObject && v2IsObject) {
      option1[key] = mergeOptions(v1, v2);
      return;
    }

    option1[key] = v2;
  });

  return option1;
};

const getWebpackConfig = () => {
  const files = fs.readdirSync(__dirname);
  files.forEach(function (file) {
    let curPath = __dirname + "/" + file;
    if (file === "utils.js" || file === "webpack.config.js") return;
    const curConfig = require(curPath);
    if (curConfig.__ignore) return;
    config = mergeOptions(config, curConfig);
  });
  return config;
};

module.exports = {
  mergeOptions,
  getWebpackConfig,
};
