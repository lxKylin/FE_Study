/**
 * 1.可选链运算符?.
 * 对于方法
 */
let parent = {
  friends: ['p5', 'p6', 'p7', 'p8'],
  getName: (name) => {
    console.log(`this is ${name}`);
  }
};

parent.getName?.('Kylin');

/**
 * 2.逻辑空分配 ??=
 * expr1 ??= expr2
 * 在expr1 为 null或undefined时才将值分配给expr2，否则返回的值都为expr1
 */
let x = false;
let y = 1;
console.log((x ??= y)); // false
let a;
let b = 1;
console.log((a ??= b)); // 1

/**
 * 3.逻辑或分配 ||=
 * x ||= y 等同于 x || (x = y)
 * 左侧为虚值时返回右边的值
 * 虚值比如：null undefined '' "" 0 NaN document.all
 */
let c;
let d = 2;
console.log((c ||= d)); // 2
console.log(c || d); // 2
