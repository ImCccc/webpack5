import "./css/index.css";
import img from "./imgs/2.jpg";
import add from "./js/math.js";
import "./less/index.less";
import "./scss/index.scss";

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

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("注册成功: ", registration);
      })
      .catch((registrationError) => {
        console.log("注册失败: ", registrationError);
      });
  });
}
