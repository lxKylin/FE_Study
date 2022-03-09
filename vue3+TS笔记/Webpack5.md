### 1.安装

- webpack、webpack-cli
  - 全局：` npm install webpack webpack-cli -g`
  - 局部：` npm install webpack webpack-cli -D`

### 2.打包

- 全局的webpack：` webpack`

- 局部的webpack：` npx webpack`

  - ```json
    //package.json
    "scripts": {
        "build": "webpack"
    },
    //npm run build
    ```

- 默认会从` scr`中的` index.js`开始打包

- 指定打包入口出口` npx webpack --entry ./src/index.js --output-path ./dist `

- 配置文件

```json
//webpack.config.json
// 配置文件

// 打包入口和出口
const path = require('path')
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js"
  }
}
```

### 3.各种loader

loader可以用于对模块的源代码进行转换解析

- css和样式，先执行css，再执行样式；use中的执行顺序是从下往上，或从右往左
- css-loader` npm install css-loader -D`开发时依赖
- style-loader` npn install style-loader -D`
- lessc将less转化成css` npm install less -D`，less-loader将less和转化后的css结合起来` npm install less-loader -D`
- postcss工具
  - ` npm install postcss postcss-cli -D`
  - 插件` autoprefixer`自动添加浏览器前缀，` npm install autoprefixer -D`
  - 使用` npx postcss --use autoprefixer -o demo.css test.css`
  - ` npm install postcss-loader -D`
- file-loader：图片打包
  - PlaceHolders：保留原来的文件名、扩展名，同时为了防止重复，包含一个hash值

```js
{
  test: /\.(jpe?g|png|gif|svg)$/,
  use: {
    loader: "file-loader",
    options: {
      // outputPath: "img",
      name: "img/[name]_[hash:6].[ext]"
    }
  }
}
```

- url-loader：和file-loader的工作方式相似，但是可以将较小的文件，转成base64的URI

### 4.资源模块类型(asset module type)

- 在webpack5之前，加载资源需要使用一些loader

- 在webpack5开始，可以直接使用一些资源模块类型，代替loader

  - asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现
  - asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现
  - asset/source 导出资源的源代码。之前通过使用 raw-loader 实现
  - asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体 积限制实现

  - 图片打包

```js
{
  test: /\.(jpe?g|png|gif|svg)$/,
  type: "asset",
  generator: {
    // 输出路径和文件名
  	filename: "img/[name]_[hash:6][ext]"
  },
  parser: {
    dataUrlCondition: {
      maxSize: 100 * 1024
    }
  }
},
```

