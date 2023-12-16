// 使用Map方法
const unique1 = (arr) => {
  const map = new Map();
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    // 如果map中没有这一项就执行
    if (!map.has(arr[i])) {
      map.set(arr[i], true);
      res.push(arr[i]);
    }
  }
  return res;
};

let arr = [1, 1, 2, 2, 3, 4, 5, 66, 5, 66];
console.log(unique1(arr));

// 使用include方法
const unique2 = (arr) => {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    // 如果res数组中没有该值
    if (!res.includes(arr[i])) res.push(arr[i]);
  }
  return res;
};

console.log(unique2(arr));

let a = [
  {
    name: '123'
  },
  {
    name: '123'
  },
  {
    name: '111'
  },
  {
    name: '123'
  }
];

const uniqueObject = (arr) => {
  let res = [];
  let map = new Map();
  for (let item of arr) {
    if (!map.has(item.name)) {
      map.set(item.name, item);
    }
  }
  res = [...map.values()];
  return res;
};

console.log(uniqueObject(a), '333');
