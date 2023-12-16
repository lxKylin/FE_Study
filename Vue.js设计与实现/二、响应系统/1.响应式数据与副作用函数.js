/**
 * 副作用函数
 * 在自身函数执行时，会直接或者间接影响其他函数的执行
 * 如下：
 * changeText 可以改变body的文本内容，其他的也可以
 */
const changeText = () => {
  // document.body.innerHTML = 'Hello Kylin';
  // document.body.innerHTML = obj.text;
  console.log(obj.text);
};

/**
 * 实现简易响应式：
 * 当操作发生时，将副作用函数收集到“桶”中;
 * 当操作发生时，从“桶”中取出副作用函数并执行。
 */

// 存储副作用函数的桶
const bucket = new Set();

// 原始数据
const data = { text: 'Hello Vue3' };

// 对原始数据的代理
const obj = new Proxy(data, {
  // 拦截读取操作
  get(target, key) {
    console.log(target, 'target-get');
    console.log(key, 'key-get');
    // 将副作用函数 changeText 添加到存储副作用函数的桶中
    bucket.add(changeText);
    // 返回属性值
    console.log(target[key], 'target[key]');
    return target[key];
  },
  // 拦截设置操作
  set(target, key, newVal) {
    console.log(target, key, newVal, 'set');
    // 设置属性值
    target[key] = newVal;
    // 把副作用函数从桶里取出并执行
    bucket.forEach((fn) => fn());
    // 返回 true 代表设置操作成功
    return true;
  }
});

changeText();

setTimeout(() => {
  obj.text = 'Hello Kylin';
}, 2000);
