### 什么是模块化

- 模块化开发最终的目的是将程序划分成**一个个小的结构**

- 这个结构中编写**属于自己的逻辑代码，有自己的作用域，不会影响到其他的结构**
- 这个结构可以将自己希望暴露的**变量、函数、对象等导出**给其结构使用
- 也可以通过某种方式，**导入另外结构中的变量、函数、对象**等
- 在Node中每一个js文件都是一个单独的模块；

### CommonJS

- CommonJS规范的核心变量：exports、module.exports、require
- ` exports`和` module.exports`可以负责**对模块中的内容进行导出**；
  - ` exports`
    - exports是一个对象，我们可以在这个对象中添加很多个属性，添加的属性会导出
    - 实际是一个**浅拷贝(引用赋值)**
  - ` module.exports`
    - 模块的导出
  - 在Node中真正用于导出的其实根本不是` exports`，而是` module.exports`，` module`才是真正的实现者
    - 为什么` exports`也可以导出呢？
      - 因为module对象的exports属性是exports对象的一个引用
      - 也就是说 ` module.exports` =` exports`
- ` require`函数可以帮助我们**导入**其他模块（自定义模块、系统模块、第三方库模块）中的内容

