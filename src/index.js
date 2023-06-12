import "./css/index.css";
import "./less/index.less";
import "./scss/index.scss";
import img from "./imgs/2.jpg";
import add from "./js/math.js";

const aaa = () => {
  const imgDom = document.createElement("img");
  imgDom.src = img;
  document.body.append(imgDom);
  const divDom = document.createElement("div");
  divDom.className = "c1";
  divDom.innerHTML = "c ddd    d   1";
  document.body.append(divDom);

  divDom.onclick = () => {
    import(/* webpackChunkName: "sum" */ "./js/index.js").then((data) => {
      console.log(data.default);
    });
  };
};

aaa();
add();

new Promise(() => {
  console.log([1, 2, 3].includes(1));
  new Map();
});
