const rand = (size) => {
  console.log(size);
  let labels = [];
  let datas = [];

  for (let index = 0; index < size; index++) {
    labels.push(index);
    datas.push(Math.ceil(Math.random() * 10));
  }

  return { labels: labels, datas: datas };
};

export default { rand };
