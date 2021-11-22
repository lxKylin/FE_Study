# reduce 语法
```js
arr.reduce(callback,[initialValue])
```
## callback 详解
- reduce 为数组中的每一个元素依次执行回调函数callback，不包括数组中被删除或从未被赋值的元素，接受四个参数：
  - 初始值（或者上一次回调函数的返回值）
  - 当前元素值
  - 当前索引
  - 调用 reduce 的数组。

- initialValue(可选参数)
  - 当设置了initialValue参数时，callback 第一个参数 初始值将默认是 initialValue。
