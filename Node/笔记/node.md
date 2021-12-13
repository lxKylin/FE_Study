### 特殊的全局对象

- 这些全局对象可以**在模块中任意使用**，但是在**命令行**交互中是**不可以使用**的；
- 包括：` __dirname、__filename、exports、module、require()`

#### ` __dirname`：获取当前文件所在的目录

- 注意：**不**包括后面的文件名

#### ` __filename`：获取当前文件所在的路径及文件名称：

- 注意：包括后面的文件名称

### 常见的全局对象

#### process对象：process提供了Node进程中相关的信息：

- 比如Node的运行环境、参数信息等；

#### console对象：提供了简单的调试控制台

#### 定时器函数

- ` setTimeout(callback, delay[, ...args])`：callback在delay毫秒后执行一次；
- ` setInterval(callback, delay[, ...args])`：callback每delay毫秒重复执行一次；
- ` setImmediate(callback[, ...args])`：callbackI/O事件后的回调的“立即”执行；
- ` process.nextTick(callback[, ...args])`：添加到下一次tick队列中；







