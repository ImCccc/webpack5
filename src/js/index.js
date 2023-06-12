const sum = (...a) => {
  console.log(1);
  return a.reduce((t, c) => t + c, 0);
};

export default sum;
