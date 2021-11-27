###  1.数组去重

```js
const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}];
// => [1, '1', 17, true, false, 'true', 'a', {}, {}]
```

#### 1.1利用Set

```js
const res1 = Array.from(new Set(arr));
```

#### 1.2利用include

```js
const unique3 = arr => {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (!res.includes(arr[i])) res.push(arr[i]);
  }
  return res;
}
```

#### 1.3利用Map

```js
const unique5 = arr => {
  const map = new Map();
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (!map.has(arr[i])) {
      map.set(arr[i], true)
      res.push(arr[i]);
    }
  }
  return res;
}
```

#### 1.4使用fliter

```js
const unique4 = arr => {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index;
  });
}
```

### 2.数组扁平化

```js
const arr = [1, [2, [3, [4, 5]]], 6];
// => [1, 2, 3, 4, 5, 6]
```

#### 2.1使用flat()

```js
const res1 = arr.flat(Infinity);
```

#### 2.2正则

```js
const res3 = JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, '') + ']');
```

#### 2.3使用reduce

```js
const flatten = arr => {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, [])
}
const res4 = flatten(arr);
```

#### 2.4函数递归

```js
const res5 = [];
const fn = arr => {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      fn(arr[i]);
    } else {
      res5.push(arr[i]);
    }
  }
}
fn(arr);
```

### 3.防抖

```js
function debounce(fn, delay = 50){
  let timer = null  //timer是闭包中的,不能被别人修改
  return function(){
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}
```

### 4.节流

```js
function throttle(fn, delay = 100){
  let timer = null
  return function(){ 
    if(timer){
      return
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    },delay)
  }
}
```

### 5.冒泡排序

```js
function bubbleSort(arr) {
  // 缓存数组长度
  const len = arr.length;
  // 外层循环用于控制从头到尾的比较+交换到底有多少轮
  for (let i = 0; i < len; i++) {
    // 内层循环用于完成每一轮遍历过程中的重复比较+交换
    for (let j = i + 1; j < len; j++) {
      // 左往右升序
      if (arr[j] < arr[i]) {
        // 交换两者
        let tmp=arr[i];
        arr[i]=arr[j];
        arr[j] = tmp;
      }
    }
  }
  // 返回数组
  return arr;
}
console.log(bubbleSort([3, 6, 2, 4, 1]));//[1,2,3,4,6]
```

