class myPromise {
  // executor是个执行器，进入会立即执行
  constructor(executor) {
    // 初始化state为等待状态
    this.state = 'pending'
    // 成功的值
    this.value = undefined
    // 失败的原因
    this.reason = undefined

    // 成功存放的数组
    this.onResolvedCallbacks = []
    // 失败存放的数组
    this.onRejectedCallbacks = []

    let resolve = value => {
      if (this.state === 'pending') {
        // resolve调用后，state转换为成功状态
        this.state = 'fulfilled'
        // 存储成功的值
        this.value = value
        // 一旦resolve执行，调用成功数组的函数
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    }

    let reject = reason => {
      if (this.state === 'pending') {
        // reject调用后，state转换为失败状态
        this.state = 'rejected'
        // 存储失败的值
        this.reason = reason
        // 一旦reject执行，调用失败数组的函数
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    }

    // // 如果executor执行报错，直接执行reject
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  // then方法 两个参数 onFulfilled, onRejected
  then(onFulfilled, onRejected) {
    // 状态为fulfilled，执行onFulfilled，传入成功的值
    if (this.state === 'fulfilled') {
      onFulfilled(this.value)
    }
    // 状态为rejected，执行onRejected，传入失败的原因
    if (this.state === 'rejected') {
      onRejected(this.reason)
    }
    
    // 当状态state为pending时
    if (this.state === 'pending') {
      // onFulfilled传入到成功数组
      this.onResolvedCallbacks.push(()=>{
        onFulfilled(this.value);
      })
      // onRejected传入到失败数组
      this.onRejectedCallbacks.push(()=>{
        onRejected(this.reason);
      })
    }
  }
}
