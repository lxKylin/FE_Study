// 需转化数组示例
let data = [
  {
    id: '01',
    label: '项目经理',
    pid: ''
  },

  {
    id: '02',
    label: '产品leader',
    pid: '01'
  },

  {
    id: '03',
    label: 'UIleader',
    pid: '01'
  },

  {
    id: '04',
    label: '技术leader',
    pid: '01'
  },

  {
    id: '05',
    label: '测试leader',
    pid: '01'
  },

  {
    id: '06',
    label: '运维leader',
    pid: '01'
  },

  {
    id: '07',
    label: '产品经理',
    pid: '02'
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

console.log(toTree(data));

const comment_list = [
  {
    userInfo: {
      user_id: '1636335031694674',
      user_name: '刘鑫'
    },
    followType: 'concat',
    followId: '63c4ea8257cfeec6482760c8',
    content: 'ceshipinglun',
    parentId: '0',
    createTime: '2023-02-04T05:53:31.188Z',
    updateTime: '2023-02-04T05:53:31.188Z',
    id: '63ddf2db5b3b37578a4077ab'
  },
  {
    userInfo: {
      user_id: '16659703499344544',
      user_name: '莫维'
    },
    followType: 'concat',
    followId: '63c4ea8257cfeec6482760c8',
    content: 'ceshipinglun',
    parentId: '63ddf2db5b3b37578a4077ab',
    createTime: '2023-02-04T05:53:31.188Z',
    updateTime: '2023-02-04T05:53:31.188Z',
    id: '63ddf3285b3b37578a4077da'
  }
];

// function foltToTree(arr) {
//   //先检测是不是数组类型
//   if (!Array.isArray(arr)) {
//     return [];
//   }
//   // JS的对象就是hash表
//   const obj = {};
//   arr.forEach((item) => {
//     obj[item.id] = item;
//   });
//   const targetArr = [];
//   arr.forEach((item) => {
//     const parent = obj[item.parentId]; //有pId就说明他有父亲，找到他的父亲parent
//     if (parent) {
//       //如果他有父亲，就给他添加children属性
//       parent.children = parent.children || [];
//       parent.children.push(item);
//     } else {
//       //他没有父亲，就把当前项push进去（顶层）
//       targetArr.push(item);
//     }
//   });
//   return targetArr;
// }

/**
 * 方法三：不用递归的简单循环
 * @param { Array } 源数据
 */

const arrayToTree = (items) => {
  const result = []; // 结果集
  const itemMap = {};

  // 先转成map存储
  for (const item of items) {
    itemMap[item.id] = { ...item, children: [] };
  }

  for (const item of items) {
    const id = item.id;
    const parentId = item.parentId;
    const treeItem = itemMap[id];

    if (parentId == 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[parentId]) {
        itemMap[parentId] = { children: [] };
      }
      itemMap[parentId].children.push(treeItem);
    }
  }
  return result;
};

// const res3 = arrayToTree(array);
// console.log("res3", res3);

function arrToTree(list) {
  // 定义最终需要返回的树形结构数据
  let treeData = [];
  // 对传入的数组进行遍历
  list.forEach((item) => {
    // 如果pid没有值,那就是顶级对象,直接添加进数组
    if (item.parentId == '0') {
      treeData.push(item);
    }
    // 理解为二次遍历 ：每个对象都找一遍自己的孩子添加到children
    let objList = list.filter((data) => data.parentId === item.id);
    if (objList.length) {
      item.children = objList;
    }
  });
  return treeData;
}

console.log(arrToTree(comment_list));
console.log(arrToTree(comment_list)[0].children);

console.log(Object.getOwnPropertyDescriptors(comment_list[0]));
