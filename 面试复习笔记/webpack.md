### 1.配置打包出入口

- 新建` webpack.config.js`文件

```js
const path = require('path'); //引入node核心模块
 
module.exports = {
    entry: './src/main.js',//从那一个文件开始打包
    output: { //打包好的文件,放置信息如下
        path: path.resolve(__dirname, 'dist'),
        //dirname 表示当前路径,dist 是文件夹
        filename: 'bundle.js'
    }
}
```

### 2.loader转换某些类型模块，是个转换器

- 使用过程
  - 步骤一：通过npm安装需要使用的loader
  - 步骤二：在webpack.config.js的modules下配置

- 使用过的loader
  - css文件处理：css-loader(负责加载css文件)
  - css文件处理：style-loader(负责将css具体样式嵌套到文档)
  - less文件处理：less-loader
  - 图片文件处理：url-loader
  - 图片文件处理：file-loader
  - ES6语法转ES5：baber-loader
  - .vue文件封装处理：vue-loader及vue-template-compiler(这个版本要和vue版本一致)

### 3.plugin：插件

- 使用过程
  - 步骤一：通过npm安装需要使用的plugin
  - 步骤二：在webpack.config.js的plugin下配置

- 打包html的plugin
  - ` HtmlWebpackPlugin`
- js压缩(丑化js代码)
  - ` uglifyjs-webpack-plugin`

### 为什么要使用webpack

- 在日常的开发中经常在一个index.html页面中引入多个css，js文件，会导致页面加载慢，所以有必要将他们**合并为一个文件**，

- 它做的事情是，分析项目结构，找到`JavaScript`模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并**将其打包为合适的格式以供浏览器使用**

#### 优点

- 模块化开发（import，require）
- 预处理（Less，Sass，ES6，TypeScript……）
- 主流框架脚手架支持（Vue，React，Angular）
- 庞大的社区（资源丰富，降低学习成本）
- webpack在打包过程中，会分析各个文件之间的依赖关系，然后生成一个依赖图并用文件的形式保存下来，未来浏览器运行代码的时候就可以读取这个文件，就知道了各个代码块之间的关联以及如何调用了。

### 模块化

#### CommonJS

- 通过` require`引入模块，` module.exports`导出模块
- 这种模块加载方案是**服务器端的解决方案**，它是以**同步的方式**来引入模块的，因为在服务端文件都存储在本地磁盘，所以读取非常快，所以以同步的方式加载没有问题。
- 如果是在**浏览器端**，由于模块的加载是使用网络请求，因此使用**异步加载**的方式更加合适。AMD是异步的

#### ES Module

- 使用 import 和 export 的形式来导入导出模块。

#### ES6 Module对比CommonJS

- CommonJS模块是**运行时加载**，ES6 Module是**编译时输出接口**；
- CommonJS加载的是整个模块，将所有的接口全部加载进来，ES6 Module可以单独加载其中的某个接口；
- **CommonJS输出是值的拷贝**，**ES6 Module输出的是值的引用**，被输出模块的内部的改变会影响引用的改变；
- CommonJS `this`指向当前模块，ES6 Module `this`指向`undefined`;


### webpack的构建流程

- 初始化参数
- 开始编译
- 确定入口
  - entry入口
- 编译模块
- 完成模块编译并输出
- 输出完成



- 初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler
- 编译：从 Entry 出发，针对每个 Module 串行调用对应的 Loader 去转换文件的内容，再找到该 Module 依赖的 Module，递归地进行编译处理
- 输出：将编译后的 Module 组合成 Chunk，将 Chunk 转换成文件，输出到文件系统中

### webpack的热更新原理

- 缩写为 `HMR`。 这个机制可以做到不用刷新浏览器而将更新后的模块替换掉旧的模块。

- 开启了express应用，**添加了对webpack编译的监听，添加了和浏览器的websocket长连接，当文件变化触发webpack进行编译并完成后，会通过socket消息告诉浏览器准备刷新。**

- 而为了减少刷新的代价，就是不用刷新网页，而是`刷新某个模块，webpack-dev-server可以支持热更新，通过生成 文件的hash值来比对需要更新的模块，浏览器再进行热更新

  