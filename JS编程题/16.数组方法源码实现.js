Array.prototype.myForEach = function (fn) {
  if (!fn) throw new TypeError('undefined is not a function');
  if (typeof fn !== 'function') throw new TypeError('fn is not a function');
  for (let i = 0; i < this.length; i++) {
    fn(this[i], i, this)
  }
}

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