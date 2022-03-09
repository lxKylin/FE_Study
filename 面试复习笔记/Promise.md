### 1.Promise是异步编程的一种解决方案

Promise是异步编程的一种解决方案，他是一个构造函数，可以解决复杂网络请求出现的回调地狱；异步操作时，使用Promise对异步操作进行封装，它可以传入两个参数：resolve、reject，成功的时候调用resolve进行网络请求，再到下一步then处理代码，失败的时候调用reject，再到下一步catch捕获错误；

- 是一个**构造函数**

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

- 常见场景：网络请求
- 复杂的网络请求会出现**回调地狱**，层级复杂，且不易维护
- Promise可解决这个问题
- 异步请求（操作）时，使用Promise对异步操作进行封装
- **Promise是个类**
- 两个**特点**：
  - 对象的状态不受外界影响
  - 一旦状态改变，就不会再变，任何时候都可以得到这个结果
- **缺点**：
  - 一旦新建它就会立即执行，无法中途取消
  - 如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部
  - 当处于`pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

```js
// new -> 构造函数(1.保存了一些状态信息 2.执行传入的函数)
// 在执行传入的回调函数时，会传入两个参数，resolve, reject 本身又是函数
//resolve(解决), reject(拒绝)
new Promise((resolve, reject) => {
  setTimeout(() => {//异步操作，模拟网络请求
    // 成功的时候调用resolve进行网络请求 -> then() 下一步，进行处理代码
    resolve('Hello Vue.js')
    // 失败的时候调用reject -> catch() 捕获错误
    reject('error message')
  	}, 1000)
 }).then((data) => {
  console.log(data);
 }).catch((err) => {
  console.log(err);
})
//另一种写法,then方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为resolved时调用，第二个回调函数是Promise对象的状态变为rejected时调用
.then(data => {
      console.log(data);
    }, err => {
      console.log(err);
    })
```

### 2.Promise三种状态

- pending：进行中，比如正在进行网络请求，或者定时器没到时间
- fulfilled：已成功，在回调resolve时，就处于该状态，并且回调.then()
- rejected：已失败，在回调reject时，就处于该状态，并且回调.catch()
- 一旦状态改变就不会再变(两种可能)

### 3.Promise链式调用：即`then`方法后面再调用另一个`then`方法

- 无论是then还是catch都可以返回一个Promise对象
- `Promise.resolve()`将数据包装成Promise对象，并且在内部回调resolve()
- `Promise.reject()`将数据包装成Promise对象，并且在内部回调reject()

```js
new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('aaa')
      }, 1000)
    }).then(res => {
      // 1.自己处理10行代码
      console.log(res, '第一层的处理10行代码');

      // 2.对结果进行第一次处理
      // return Promise.reject('err message')
      // 抛出异常
      throw 'err message';
    }).then(res => {
      console.log(res, '第二层的处理10行代码');

      // return Promise.resolve(res + '222')
  		return res + '222'
    }).then(res => {
      console.log(res, '第三层的处理10行代码');
    }).catch(err => {
      console.log(err);
    })
```

### 4.Promise.all([])方法

- 需求：需要发送两次或多个请求并得到多个结果，使用Promise.all()
- `Promise.all()`方法**只适合所有异步操作都成功**的情况，如果有一个reject，就会执行catch

```js
Promise.all([
  // new Promise((resolve, reject) => {
  //   $ajax({
  //     url: '1',
  //     success: function (data) {
  //       resolve(data)
  //     }
  //   })
  // }),
  // new Promise((resolve, reject) => {
  //   $ajax({
  //     url: '2',
  //     success: function (data) {
  //       resolve(data)
  //     }
  //   })
  // })

  new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve('result1')
      resolve({name: 'lx', age: 18});
    }, 1000)
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve('result2')
      resolve({name: 'Kylin', age: 21})
    }, 2000)
  })
]).then(results => {
  console.log(results);
})
```

### 5.Promise.race([])方法

- 多个 Promise 任务同时执行，返回最先执行结束的 Promise 任务的结果，不管这个 Promise 结果是成功还是失败

```js
//race方法
Promise.race = function(promises){
  return new Promise((resolve,reject)=>{
    for(let i=0;i<promises.length;i++){
      promises[i].then(resolve,reject)
    }
  })
}
```

### 6.Promise.finally()方法

- 不管 Promise 对象最后状态如何(与状态无关)，都会执行的操作
- 不管`promise`最后的状态，在执行完`then`或`catch`指定的回调函数以后，都会执行`finally`方法指定的回调函数

```js
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

### 7.Promise.allSettled([]) 方法

- 用来确定**一组**异步操作是否**都**结束了（不管成功或失败）。所以，它的名字叫做”Settled“，包含了”fulfilled“和”rejected“两种情况。

