// 需转化数组示例
let data = [
  {
    id: "01",
    label: "项目经理",
    pid: "",
  },

  {
    id: "02",
    label: "产品leader",
    pid: "01",
  },

  {
    id: "03",
    label: "UIleader",
    pid: "01",
  },

  {
    id: "04",
    label: "技术leader",
    pid: "01",
  },

  {
    id: "05",
    label: "测试leader",
    pid: "01",
  },

  {
    id: "06",
    label: "运维leader",
    pid: "01",
  },

  {
    id: "07",
    label: "产品经理",
    pid: "02",
  }
];

function toTree(data) {
  // 1.定义最外层的数组
  const tree = [];
  // 2.定义一个空对象
  const otherObj = {};
  // 3.遍历数组内所有对象
  data.forEach((item) => {
    // 3.1.给每个当前对象添加一个 children 属性, 以便存放子级对象
    item.children = [];
    // 3.2 将当前对象的 id 作为键, 与当前对象自身形成键值对
    otherObj[item.id] = item;
  });

  // 4.再次遍历数组内所有对象
  data.forEach((item) => {
    // 4.1.判断每个当前对象的 pid, 如当前对象 pid 不为空, 则说明不是最上级的根对象
    if (item.pid) {
      // 4.3.利用当前对象的 otherObj[pid] 找到 otherObj[id] 中对应当前对象的父级对象, 将当前对象添加到其对应的父级对象的 children 属性中
      otherObj[item.pid].children.push(item);
    } else {
      // 4.3.当前对象 pid 如果为空, 则为树状结构的根对象
      tree.push(item);
    }
  });
  // 5.返回树状结构
  return tree;
}

console.log(toTree(data))
