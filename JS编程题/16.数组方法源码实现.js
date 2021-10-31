Array.prototype.myForEach = function (fn) {
  if (!fn) throw new TypeError('undefined is not a function');
  if (typeof fn !== 'function') throw new TypeError('fn is not a function');
  for (let i = 0; i < this.length; i++) {
    // fn(this[i], i, this)
    if (i in this) {
      fn(this[i], i, this)
    }
  }
}
// 这个时候res中的元素不是 undefined 也不是 null 是empty 这个也是不会去执行的，所以需要改成
// if (i in this) {
//   fn(this[i], i, this)
// }

// 创建了长度为10的数组
let res = new Array(10)
res.myForEach(i => {
  console.log(i, 1)
})

Array.prototype.myMap = function (fn) {
  if (!fn) throw new TypeError('undefined is not a function');
  if (typeof fn !== 'function') throw new TypeError('fn is not a function')
  let res = [];
  // this是当前数组
  for (let i = 0; i < this.length; i++) {
    // 当前项  下标  原数组
    let x = fn(this[i], i, this)
    res.push(x);
  }
  return res
}

let arr = [1, 2, 3, 4, 5, 6]
let a = arr.myMap(item => item * 2)
console.log(a)

Array.prototype.myFilter = function (fn) {
  if (!fn) throw new TypeError('undefined is not a function');
  if (typeof fn !== 'function') throw new TypeError('fn is not a function');
  let res = [];
  for (let i = 0; i < this.length; i++) {
    if (fn(this[i], i, this)) {
      res.push(this[i])
    }
  }
  return res;
}

Array.prototype.myEvery = function (fn) {
  if (!fn) throw new TypeError('undefined is not a function');
  if (typeof fn !== 'function') throw new TypeError('fn is not a function');
  for (let i = 0; i < this.length; i++) {
    if (!fn(this[i], i, this)) {
      return false;
    }
  }
  return true;
}

Array.prototype.mySome = function (fn) {
  if (!fn) throw new TypeError('undefined is not a function');
  if (typeof fn !== 'function') throw new TypeError('fn is not a function');
  for (let i = 0; i < this.length; i++) {
    if (fn(this[i], i, this)) {
      return true
    }
  }
  return false;
}

Array.prototype.myReduce = function (fn, init) {
  if (!fn) throw new TypeError('undefined is not a function');
  if (typeof fn !== 'function') throw new TypeError('fn is not a function');
  let pre = init;
  let i = 0;
  if (!pre) {
    pre = this[0];
    i = 1;
  }
  for (i; i < this.length; i++) {
    pre = fn(pre, this[i], i);
  }
  return pre;
}