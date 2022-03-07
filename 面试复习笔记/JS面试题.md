### 0.介绍一下js的数据类型有哪些，值是如何存储的

- 8种数据类型
- **7种基本(原始)数据类型**：Null、Undefined、String、Boolean、Number、Symbol、BigInt
- String、Boolean、Number，具有包装类型，可以和引用类型一样调用方法

```js
let s1 = "some text";
let s2 = s1.substring(2)
//s1是一个字符串类型，是一个基本类型，并不是一个对象，却可以使用方法
let s1 = new String("some text")
let s2 = s1.substring(2)
s1 = null
```

- **1种引用数据类型**： **Object，包含Array、function、data**等
- 基本数据类型：直接存储在**栈**(stack) 中，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储。
- 引用数据类型：同时存储在**栈**(stack) 和**堆**(heap) 中，占据空间大、大小不固定。引用数据类型在栈中存储了指针，指针指向堆中实体的起始地址。当解释器寻找引用值时，会首先检索栈中的地址，取得地址后从堆中获得实体。

#### 栈和堆

- 栈
  - 后进先出
- 堆
  - 用数组实现的完全二叉树
- 队列
  - 先进先出

#### 函数执行过程

- 当一个**函数被调用时**，js 会为其创建执行环境，js引擎就会把这个执行环境 放入一个栈中 来处理。
- 这个栈，我们称之为**函数调用栈（call stack）**。栈底永远都是**全局环境**，而栈顶就是当前正在**执行函数的环境**
- 后进先出

```js
function A(){
   console.log("this is A");
   function B(){
       console.log("this is B");
   }
   B();
}

A();
```

- 那么这段代码执行的情况就是这样了。
  - 首先 A() ;A 函数执行了，A执行环境入栈。
  - A函数执行时，遇到了 B()，B入栈。
  - B执行完 出栈。
  - A执行完 出栈。

![函数执行过程](https://cdn.nlark.com/yuque/0/2022/jpeg/23115285/1646543261031-d71b910f-00f7-44c2-86c3-b504e68b9e06.jpeg)


#### null和undefined的区别

```js
console.log(null == undefined);    //true  因为两者都默认转换成了false
console.log(typeof undefined);    //"undefined"  
console.log(typeof null);       //"object"  
console.log(null === undefined);    //false   "==="表示绝对相等，null和undefined类型是不一样的，所以输出“false”
```

- `null`**表示没有对象，即该处不应该有值**
  - 作为对象原型链的终点
  - `null` 默认转成 `0`
- `undefined`**表示缺少值，即此处应该有值，但没有定义**
  - `undefined` 默认转成 `NaN`

### 1.let和const

- **在块级作用域内，使用let命令声明变量之前，该变量都是不可用的**，这被称为“**暂时性死区**”。 当我们在声明变量之前尝试访问变量时，`JavaScript`会抛出一个`ReferenceError`。
- **暂时性死区的本质**就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量
- **const 、 let和var的区别？**
  - **var：**只有全局作用域和函数作用域概念；变量可以多次声明，存在变量提升(就是函数任意地方声明变量都可以)

  - **const：**const声明的变量必须经过初始化，const只有块级作用域概念；不允许在相同作用域内重复声明同一个变量
  - **let：**let只有块级作用域概念；不允许在相同作用域内重复声明同一个变量

### 2.ES6解构赋值

- 按照一定模式从数组和对象中提取值，对变量进行赋值

#### 2.1数组的解构

```js
const F4 = ['陆军', '海军', '空军', '火箭军']
let [lu, hai, kong，huo] = F4
console.log(lu);//陆军
console.log(hai);//海军
console.log(kong);//空军
console.log(huo);//火箭军
```

#### 2.2对象的解构

```js
const hai = {
	name: 'navy',
	age: 490423,
};
let {name, age} = hai;
console.log(name);//navy
console.log(age);//490423
```

### 3.闭包

- 指**有权访问另一个函数作用域中变量的函数**
- 防抖节流就是个闭包
- 函数嵌套(return返回)函数，一个作用域中的函数可以访问另一个函数中的的局部变量
- 作用：

  - 变量私有化

  - 延伸了变量的作用范围(使我们在函数外部能够访问到函数内部的变量)
  - 使已经运行结束的函数上下文中的变量对象继续留在栈内存中，因为闭包会保留对这个变量对象的引用，所以这个变量对象不会被回收。
- 缺点：
  - 内存泄露：闭包使用过度而导致的内存占用无法释放的情况，可能会导致应用程序卡顿或者崩溃
- 内存泄露解决方案
  - 使用严格模式
  - 关注 `DOM` 生命周期，在销毁阶段记得解绑相关事件
  - 避免过度使用闭包

### 4.严格模式

- 消除了JS语法的一些不合理、不严谨之处，减少了一些怪异行为
- 消除代码运行的一些不安全之处，保证代码运行的安全
- 提高了编译器效率，提高了运行速度

#### 4.1开启严格模式

- **为脚本**开启严格模式

```js
//1
<script>
	'use strict';
//下面的js代码就会开启严格模式
</script>
//2 定义一个立即执行函数
<script>
	(function() {
		'use strict';
//下面的js代码就会开启严格模式
	})()
</script>
```

- **为函数**开启严格模式

```js
<script>
	function() {
		'use strict';
		//下面的js代码就会开启严格模式
	}
</script>
```

#### 4.2严格模式的变化

- **变量规定**：
  - 必须先声明，在使用
  - 不能随意删除已经声明的变量
- **this指向问题**：
  - 全局作用域中函数的this是underfined(非严格模式指向window)
  - 如果构造函数不加new调用，this指向会报错
  - 定时器里的this还是指向window

### 5.call、apply、bind总结

- 相同点：
  - 都可以改变函数内部的this指向
- 不同点：
  - call和apply会调用函数，并且改变函数内部this指向
  - call和apply传递的参数不一样，call传递参数aru1，aru2...形式，apply传递两个参数(一个是函数作用域this，另一个是参数数组)
  - bind不会调用函数，可以改变函数内部this指向，**一旦使用bind改变指向，就不可以再更改**

- 应用场景
  - call：经常做继承
  - apply：经常跟数组有关系
  - bind：不调用函数，但要改变this指向

### 6.浅拷贝和深拷贝

- 防止父对象数据被篡改

#### 6.1浅拷贝(只是拷贝了地址)

- 创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。

- 如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，如果其中一个对象改变了这个地址，就会影响到另一个对象。

- 实现方式：

  - ` Object.assign() `方法： 用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象

  ```js
  let obj = {
  	id: 1,
  	name: 'andy',
  };
  //将obj拷贝给o
  let o = Object.assign({}, obj);
  //for (let k in obj) {
  //	o[k] = obj[k];
  //}
  ```
  
  - ` Array.prototype.slice()`：slice() 方法返回一个新的数组对象，这一对象是一个由 begin和end（不包括end）决定的原数组的浅拷贝
  - **第三方库：lodash**
  
  ```js
  //CDN
  <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
  const info = {name: "Kylin", age: 21, friend: {name: "lx", age: 18}};
  const obj = _.clone(info)
  ```
  
  - **拓展运算符`...`：**(最简单)
  
  ```js
  let a = {
      name: "Jake",
      flag: {
          title: "better day by day",
          time: "2020-05-31"
      }
  }
  let b = {...a};
  ```

#### 6.2深拷贝(新开辟一个空间存放)

- 将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象
- 实现方法：**第三方库：lodash**

```js
//CDN
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
const info = {name: "Kylin", age: 21, friend: {name: "lx", age: 18}};
const obj = _.cloneDeep(info)
```

- 实现方式：` JSON.stringify`转为字符串再` JSON.parse`

  - ` JSON.parse((JSON.stringify(origin_data))`，缺点诸多（会忽略undefined、symbol、函数；不能解决循环引用；不能处理正则、new Date()）

  ```js
  const info = {name: "Kylin", age: 21, friend: {name: "lx", age: 18}};
  const obj = JSON.parse(JSON.stringify(info)); //1.转字符串,2.还原生成新对象
  info.friend.name = "Kobe";
  console.log(info.friend.name === obj.friend.name); //false
  ```

- 实现方式：递归

  - 新建对象用于保存；判断是不是引用对象类型且不能是null；判断传入的是数组还是对象，是数组的话进行for-in

```js
function cloneDeep(obj) {
  let newObj = null
  if (typeof(obj) === 'object' && obj !== 'null') {
    newObj = obj instanceof Array  ? [] : {}
    for (let i in obj) {
      newObj[i] = cloneDeep(obj[i])
    }
  }else {
    newObj = obj
  }
  return newObj
}
```

### 7.箭头函数和普通函数的区别

1.箭头函数是匿名函数，不能作为构造函数，不能使用new
2.箭头函数不能绑定arguments，取而代之用rest参数解决
3.箭头函数没有原型属性
4.普通函数的this指向调用它的对象
5.箭头函数不绑定this，会捕获其所在的上下文的this值，作为自己的this值

#### arguments

- 是**类数组**对象，**代表传给一个function的参数列表**

  - 除了length属性和索引元素之外没有任何`Array`属性，方法

- **argument对象转数组**

  ```js
  var args = Array.prototype.slice.call(arguments)
  var args = [].slice.call(arguments);
  var args = Array.from(arguments)
  var args = [...arguments]
  ```

  

### 8.this指向

- 在浏览器里，在全局范围内this 指向window对象；
- 在函数中，this永远指向最后调用他的那个对象；
- 构造函数中，this指向new出来的那个新的对象；
- call、apply、bind中的this被强绑定在指定的那个对象上；

- 箭头函数没有` this`，它的` this`指向函数定义位置的上下文` this`

### 9.原型与原型链

- 每个**函数对象**都有一个`prototype` 属性，这个属性是**从一个函数指向一个对象**，指向的是**原型对象**
  - ` prototype`是函数独有的
- **对象**身上系统会自己添加一个` __proto__`(隐式原型)指向我们构造函数的原型对象` prototype`，之后就可以使用原型对象上的方法
  - ` __proto__`，` constructor`(构造器)是对象独有的(函数也是个对象)
- 当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象里找这个属性，这个原型对象又会有自己的原型，于是就这样一直找下去，也就是**原型链**
- 原型链的终点是` null`

### 10.浏览器三种事件模型

- DOM0级事件模型
  - 这种模型不会传播，所以没有事件流的概念，它可以在网页中直接定义监听函数，也可以通过 js属性来指定监听函数
- IE事件模型
  - 该事件模型中，一次事件共有**两**个过程，**事件处理阶段**，和**事件冒泡阶段**。
  - **事件处理**阶段会首先执行目标元素绑定的监听事件
  - **事件冒泡**指的是事件从目标元素冒泡到 ` window`，依次检查经过的节点是否绑定了事件监听函数
- DOM2级事件模型
  - 在该事件模型中，一次事件共有**三**个过程，第一个过程是**事件捕获阶段**。捕获指的是事件从 ` window` 一直向下传播到目标元素，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。**后面两个阶段和 IE 事件模型的两个阶段相同**。

### 11.事件委托

- 本质上是利用了浏览器事件冒泡的机制。因为事件在冒泡过程中会上传到父节点，并且父节点可以通过事件对象获取到目标节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件
- ` ul - li - li`
- **优化**：不必要为每一个子元素都绑定一个监听事件，减少内存上的消耗。并且使用事件代理还可以实现事件的动态绑定

### 12.事件传播

- 当**事件**发生在DOM元素上时，该事件并不完全发生在那个元素上。

#### 12.1事件传播三阶段

- **捕获阶段**–事件从 ` window` 开始，然后向下到每个元素，直到到达目标元素事件或` event.target`。
- **目标阶段**–事件已达到目标元素
- **冒泡阶段**–事件从目标元素冒泡，然后上升到每个元素，直到到达 ` window`

#### 12.2事件捕获

- 当事件发生在 DOM 元素上时，该事件并不完全发生在那个元素上。在捕获阶段，事件从window开始，一直到触发事件的元素。`window----> document----> html----> body ---->目标元素`

#### 12.3事件冒泡

- 事件冒泡刚好与事件捕获相反，`当前元素---->body ----> html---->document ---->window`。当事件发生在DOM元素上时，该事件并不完全发生在那个元素上。在冒泡阶段，事件冒泡，或者事件发生在它的父代，祖父母，祖父母的父代，直到到达window为止

### 13.JS创建对象的方式

#### 13.1直接创建Object实例

- 每创建一个对象就需要手动设置它的每一个属性，造成大量代码重复，JS可以使用工厂模式解决这个问题

```js
//1.new Object()
var person = new Object();
person.name = 'lx';
person.age = 20;

person.sayName = function(){
    console.log(this.name);
};
//2.使用对象字面量{}
var person = {
    name: 'lx';
    age: 20;
    job: 'Programmer';
    
    sayName: function(){
        console.log(this.name);
    }
}
```

#### 13.2工厂模式(模版)

- 解决了创建多个相似对象的问题，但是不知道当前创建的对象是什么类型
- 创建了一个模版函数，在模版函数中使用new Object创建对象，在模版函数外可使用这个模版

```js
//创建模版
function createPerson(name, age, job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        console.log(this.name);
    };
    return o;
}

var person1 = createPerson('lx', 22, 'Programmer');
var person2 = createPerson('kylin', 20, 'Teacher');

console.log(person1);
console.log(person2);
```

#### 13.3构造函数模式(用得多)

- **构造函数名开头大写**借鉴了其他面向对象语言，是为了区别普通函数。
- 任何一个函数不通过**new操作符调用**，就是一个普通函数；
- 解决了工厂模式的缺点，知道当前创建的对象是什么类型

```js
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function(){
        console.log(this.name);
    };
}

function Robot(name, age){
    this.name = name;
    this.age = age;
}

var person1 = new Person('lx', 22, 'Programmer');
var person2 = new Person('kylin', 20, 'Teacher');

console.log(person1 instanceof Person); //true
console.log(person2 instanceof Robot); //false
```

#### 13.4原型模式

- 可以让所有对象实例共享它所包含的属性和方法

```js
function Person(){}

Person.prototype.name = 'lx';
Person.prototype.age = 18;
Person.prototype.job = 'Programmer';
Person.prototype.sayName = function(){
    console.log(this.name);
}

var person1 = new Person();
person1.sayName(); //lx
var person2 = new Person();
console.log(person1.sayName == person2.sayName); //true
```

#### 13.5组合使用构造函数模式和原型模式

- 构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性

```js
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ['kk', 'wz'];
}

Person.prototype = {
    constructor: Person,
    sayName: function(){
        console.log(this.name);
    }
};
```

#### 13.6动态原型模式

- 这里只在 sayName()方法不存在的情况下，才会将它添加到原型中

```js
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;

    if(typeof this.sayName != "function"){
        Person.prototype.sayName = function(){
            console.log(this.name);
        };
    }
}

var person1 = new Person('lx', 22, 'Programmer');
person1.sayName();
```

#### 13.7寄生构造函数模式

- 这一种模式除了使用 new 操作符并把使用的包装函数叫做构造函数之外和工厂模式的实现基本相同
- 基本思想是创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回新创建的对象；但从表面上看，这个函数又很像是典型的构造函数

```js
function Person(name, age, job){
    var o = new Object()
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        console.log(this.name);
    }
    return o;
}

var person1 = new Person('lx', 18, 'Programmer');
person1.sayName();
```

#### 13.8.ES6的Object.create()

- 参数是新对象的原型对象

### JS继承实现方式

- 继承的本质就是**复制，即重写原型对象，代之以一个新类型的实例**

- **原型链继承**
  
  - 将父类的实例作为子类的原型
  
  ```js
  function Parent() {}
  
  function Child() {};
  Child.prototype = new Parent();
  ```
  
  - 优点：父类方法可以复用
  
- **构造函数继承**
  
  - 在子类构造函数中调用父类构造函数，可以在子类构造函数中使用`call()`和`apply()`方法
  - 优点
    - 子类构造函数中向父类传参数
    - 父类的引用属性不会被共享
  
- **组合继承**
  
  - 组合继承综合了`原型链继承`和`构造函数继承`，将两者的优点结合了起来，
  - 基本的思路就是使用原型链继承原型上的属性和方法，而通过构造函数继承实例属性
  - 优点
    - 父类的方法可以复用
    - 可以在Child构造函数中向Parent构造函数中传参
    - 父类构造函数中的引用属性不会被共享
  
- **原型式继承**
  
  - 在object()函数内部, 先创建一个临时性的构造函数, 然后将传入的对象作为这个构造函数的原型,最后返回了这个临时类型的一个新实例
  - 优点：父类方法可复用
  
- **寄生式继承**
  
  - 在原型式继承的基础上，增强对象，返回构造函数
  - 优点：只调用一次父类构造函数
  
- **寄生式组合继承**(用最多)
  
  - 集寄生式继承和组合继承的优点于一身
  - **优点**
    - 只调用一次父类构造函数
    - Child可以向Parent传参
    - 父类方法可以复用
    - 父类的引用属性不会被共享
  
- **ES6类继承extends**

### 14.JS运行机制(事件循环Event Loop)

#### 14.1.JS的代码执行是基于一种事件循环的机制

- 浏览器是多线程的，JS是单线程的，浏览器只给JS分配了一个线程

- JS在单线程中实现**异步机制**主要是依赖浏览器的**任务队列**

  

- js 是单线程运行的，在代码执行的时候，将不同函数的执行上下文压入执行栈中来保证代码的有序执行。

- 在执行同步事件的时候，如果遇到了异步事件，js 引擎并不会一直等待其返回结果，而是会将这个事件挂起，继续执行执行栈中的其他任务

- 等同步事件执行完毕后，再将异步事件对应的回调(结果)加入到与当前执行栈中不同的另一个任务队列中等待执行。

- 任务队列可以分为**宏任务**对列和**微任务**对列，当前执行栈中的事件执行完毕后，js 引擎首先会判断微任务对列中是否有任务可以执行，如果有就将微任务队首的事件压入栈中执行。

- 当微任务对列中的任务都执行完成后再去执行宏任务对列中的任务。

- 宏任务每执行完一个后都会检查微任务队列，如果有那么执行微任务，以此循环

#### 14.2.进程和线程

- 把计算机看做一家公司 
- **进程**就是独立的**部门**，每个部门有自己的资源；
- **线程**就是每个部门的**员工**，每个员工没有资源，是最小的干活单位，共享部门资源；
- 一个进程可以有很多线程，每条线程并行执行不同的任务

#### 14.3.JS为什么要区分微任务和宏任务？

- js是单线程的，为了实现**异步机制**，节约时间
- 同步任务
  - 在一个线程上同一时间只能做一件事，如烧开水煮面，先烧开水，才能煮面
- 异步任务
  - 在主栈中执行一个任务，但是发现这个任务是一个异步操作，会把它移除主栈到等待任务队列中，如炒菜和烧开水，可以分开进行
- 微任务和宏任务皆为异步任务，它们都属于一个队列
- 宏任务一般是：script，setTimeout，setInterval，UI渲染
- 微任务：Promise、process.nextTick、async、await
- 遇到微任务，先执行微任务，执行完后如果没有微任务，就执行下一个宏任务，如果有微任务，就按顺序一个一个执行微任务

### 15.什么是` async/await`及其如何工作

- 是 Generator 函数的语法糖。

- `async/await`是一种建立在Promise之上的编写异步或非阻塞代码的新方法，被普遍认为是 JS异步操作最优雅的解决方案。相对于 Promise 和回调，它的可读性和简洁度都更高
- 以同步的方式执行异步
- ` async `用于声明一个 function 是异步的，而` await` 用于等待一个异步方法执行完成。
- 一个函数如果加上 ` async` ，那么该函数就会返回一个 Promise

```js
async function test() {
  //return "1"
  return await "1"
}
console.log(test()) // -> Promise {<resolved>: "1"}
```

- 相比于 `Promise`，`async/await`能更好地处理 then 的链式调用

- 优缺点： 
  - `async/await`的优势在于处理 then 的调用链，能够更清晰准确的写出代码，并且也能优雅地解决回调地狱问题。
  - 当然也存在一些缺点，因为 await 将异步代码改造成了同步代码，如果多个异步代码没有依赖性却使用了 await 会导致性能上的降低。

### 16.跨域与同源

- **跨域**是指从一个域名的网页去请求另一个域名的资源。比如从 `www.baidu.com` 页面去请求 `www.google.com` 的资源
- **同源策略是一种约定，是浏览器最核心也最基本的安全功能**。如果缺少了同源策略，则浏览器的正常功能可能都会受到影响。
- **同源：协议、域名、端口，三者全部相同，才是同源**
- **跨域：协议、域名、端口，只要有一个的不同，就是跨域**
- **跨域并不是请求发不出去，请求能发出去，服务端能收到请求并正常返回结果，只是结果被浏览器拦截了**

`http://www.123.com/index.html` 调用 `http://www.123.com/server.php` （非跨域）

`http://www.123.com/index.html` 调用 `http://www.456.com/server.php` （主域名不同:123/456，跨域）

`http://abc.123.com/index.html` 调用 `http://def.123.com/server.php` （子域名不同:abc/def，跨域）

`http://www.123.com:8080/index.html` 调用 `http://www.123.com:8081/server.php` （端口不同:8080/8081，跨域）

`http://www.123.com/index.html` 调用 `https://www.123.com/server.php` （协议不同:http/https，跨域）

`localhost` 和 `127.0.0.1` 虽然都指向本机，但也属于跨域。

#### 16.1不存在跨域的情况（无视同源策略）

- 服务端请求服务端不存在跨域（浏览器请求服务器才存在同源策略）
- `<img src="跨域的图片地址">` （`<img>`标签的 `src` 属性不存在跨域）
- `<link href="跨域的css地址">` （`<link>`标签的 `href` 属性不存在跨域）
- `<script src="跨域的js地址"></script>` （`<script>`标签的 `src` 属性不存在跨域）

#### 16.2跨域常见的方法

##### 16.2.1CORS(主流，后端实现)

- `CORS`的全称是"**跨域资源共享**"（Cross-origin resource sharing）。 它允许浏览器向跨域服务器，发出`XMLHttpRequest`请求，从而克服`AJAX`只能同源使用的限制
- 如何理解CORS
  - 如果`wang.com`和`liu.com`这两个网站都是我的，我就是想让`wang.com`去访问`liu.com`里面的数据应该怎么办呢？
  - 只需要`wang.com`在**响应头**里写`liu.com`可以访问即可。这就是`CORS`。
  - **实现`CORS`通信的关键是服务器。只要服务器实现了`CORS`接口，就可以跨域通信。**
- `CORS`跨域分为两种请求，一种是**简单请求**，另外一种就是**非简单请求**。

##### 简单请求

凡是同时满足以下两种情况的就是简单请求，反之则非简单请求，浏览器对这两种请求的处理不一样

- 请求方法是以下方三种方法之一
  - HEAD
  - GET
  - POST
- HTTP的头信息不超出以下几种字段
  - Accept
  - Accept-Language
  - Content-Language
  - Last-Event-ID
  - Content-Type：只限于三个值 `application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`

##### 非简单请求

非简单请求则是不满足上边的两种情况之一,比如请求的方式为 `PUT`,或者请求头包含其他的字段

非简单请求的`CORS`请求是会在正式通信之前进行一次预检请求

##### 16.2.2JSONP(get形式)

- **原理**：
  - **利用 <script> 标签没有跨域限制的漏洞，网页可以得到从其他来源动态产生的 JSON 数据。JSONP请求一定需要对方的服务器做支持才可以**
- JSONP优缺点
  - 优点是简单兼容性好，可用于解决主流浏览器的跨域数据访问的问题。
  - **缺点**是仅支持get方法具有局限性,不安全可能会遭受XSS攻击。

```js
function callbackFunction(){
　　alert("回滚");
}
var script=document.createElement("script");
script.src="http://frergeoip.net.json/?callback=callbackFunction";

```

##### 16.2.3webpack设置devServer => proxy

```js
devServer: {
    proxy: {
      '^/api': {
        // 映射
        target: 'http://152.136.185.210:5000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    },
    // history模式下的url会请求到服务器端，但是服务器端并没有这一个资源文件，就会返回404，所以需要配置这一项
    historyApiFallback: {
      index: '/index.html' //与output的publicPath
    }
  }
```

##### 16.2.3websocket

##### 16.2.4Nginx反向代理

### 18.回流重绘

#### 18.1回流(影响布局)

- 当render tree中的一部分(或全部)因为元素的**规模尺寸，布局，隐藏等**改变而需要重新构建，称为回流
- 每个页面至少需要一次回流，就是在页面第一次加载的时候，这时候是一定会发生回流的，因为要构建render tree

#### 18.2重绘(不影响布局)

- 当render tree中的一些元素**更新属性**，而这些属性只影响元素的外观，风格，而不会影响布局的，比如background-color

#### 18.3区别

- 回流必将引起重绘，而重绘不一定会引起回流  

### 19.防抖节流

- 是一个闭包函数

#### 19.1防抖` debounce`

- 指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间

```js
function debounce(fn, delay = 50){
  let timer = null  // timer是闭包中的,不能被别人修改
  if(timer){
     clearTimeout(timer)
  }
  return function(){
    let context = this
  	let args = arguments
    timer = setTimeout(() => {
      fn.apply(context, args)
      timer = null
    }, delay)
  }
}
```

#### 19.2节流` throttle`

- 指连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率。

```js
function throttle(fn, delay = 100){
  let oldTime = Date.now()
  return function(){ 
    let context = this
  	let args = arguments
    let nowTime = Date.now()
    if(nowTime - oldTime >= delay){
      fn.apply(context, args)
      oldTime = Date.now()
    }
  }
}
```

### 20.for-in/of/Object.keys

- 在in的时候，是打印所有的key，但是在of的时候，是打印所有（key为数字的情况）的value
- 并且**arr[1] 和arr['1'] 一样的，在下标（或者 key） 中，不区分Number和String，数组就是对象**
  - **输出Key的话，如果key是number那么按小到大排列输出，如果key是字符，那么按出现的顺序输出，且字符是跟在number之后输出的**
- for-in循环：只能获得对象的键名key，不能获得键值，且会遍历对象的整个原型链，性能非常差不推荐使用
- for-of：允许遍历获得键值value，只遍历当前对象不会遍历原型链
- for-in循环主要用于**遍历对象**，格式：for(keys in zhangsan){}
- for-of作为遍历所有**数据结构**的统一的方法。
  - **for of为什么不能遍历Object对象？**
  - 因为for of遍历依靠的是遍历器Iterator。而 **Array（数组）, String（字符串）, Map（映射）, Set（集合）**,TypedArray(类型化数组)、arguments、NodeList对象、Generator等可迭代的数据结构等早就内置好了Iterator（迭代器），它们的原型中都有一个Symbol.iterator方法，而**Object对象并没有实现这个接口，使得它无法被for...of遍历。**
- **Object.keys和for-in区别**
  - 两者之间最主要的区别就是Object.keys( )不会走原型链，而for in 会走原型链
  - Object.keys**返回的是数组(key值)**

```js
let arr = ['a', 'b', 'c']
arr["3"] = 'd'
arr["key"] = 'e'
arr[5] = 'f'

for (let key in arr) {
    console.log(key);
}
//0 1 2 3 5 key
console.log("======");

for (let value of arr) {
    console.log(value)
}
//a b c d underfined f
console.log("======");

let keys = Object.keys(arr);

console.log(keys);
//[ '0', '1', '2', '3', '5', 'key' ]

let obj = {
  2: 2,
  b: 6,
  7: 7,
  a: 5,
  56: 56,
  10: 10,
}
for (let i in obj) {
  console.log(i)
}
let k = Object.keys(obj)
console.log(k)
// [ '2', '7', '10', '56', 'b', 'a' ]
```

#### 20.1.怎么判断一个对象是空对象

- 根据`for-in`遍历对象，如果**存在则返回true，否则返回false**

```js
for ( let i in obj) {
	return true;
}
return false
```

- 用JSON自带的`JSON.stringify()`方法来判断

```js
if (JSON.stringify(obj) === '{}') {
	return true;
}
return false;
```

- **利用ES6中`Object.keys()`来进行判断 （推荐）**
  - `Object.keys()`方法会返回一个由一个给定对象的自身可枚举属性组成的数组[key]。
  - 如果我们的对象为空，他会返回一个空数组。

```js
Object.keys(obj).length === 0 ? '空' : '不为空'
```

### 21.new主要做了什么

- 创建一个空的对象` obj`、` let obj = new Object()`
- 设置原型链，将空对象的` __proto__`指向构造函数的` prototype`：` obj.__proto__ = Person.prototype`
- 让构造函数的` this`指向该对象，运行该构造函数：`let result = Person.call(obj)`
- 判断构造函数返回值类型，如果是基本类型，返回` obj`，如果是引用类型，就返回这个引用类型的对象

- 手写：

```js
function _new(fn, ...arg) {
    // Object.create(fn.prototype)使用现有的对象来提供新创建对象的__proto__(原型)
    const obj = Object.create(fn.prototype);
    const newObj = fn.apply(obj, arg);
    return newObj instanceof Object ? newObj : obj;
}

// 使用的例子：
function Firend(name, age) {
    this.name = name;
    this.age = age;
    this.sayName = function () {
        console.log(this.name);
    };
}
const xiaoMei = _new(Firend, 'Xiao Mei', 18)
console.log(xiaoMei)  // Firend {name: "Xiao Mei", age: 18, sayName: ƒ}
```

### 22.数组方法

- 响应式的

```js
letters:['a','b','c','d','e']
// 1.push方法 末尾添加 可以同时添加多个元素，返回值为添加完后的数组的长度
letters.push('f','g','h');
//2.pop() 末尾删除，返回值是删除的元素
letters.pop();
//3.shift() 删除数组第一个数据，返回值是删除的元素
letters.shift();
//4.unshift() 在数组最前面添加元素 也可以同时添加多个元素，返回值为添加完后的数组的长度
letters.unshift('8');
//5.splice() 可以删除元素/插入元素/替换元素
// splice(start,)
// 替换元素：第二个参数表示我们要替换几个元素，后面是用于替换前面的元素
letters.splice(1,2,'3','4');
// 删除元素：第二个参数传入你要删除几个元素，返回值是删除的元素
// 插入元素：第二个参数传入0，第三个参数传入要添加的元素
letters.splice(2,0,'f');
//6.sort() 排序
letters.sort();
//7.reverse() 翻转
letters.reverse();
```

- 普通

```js
//1.将字符串转化为数组
arr.split()
//数组变为字符串（可加分隔符）
arr.join()
//2.连接两个新数组
arr.concat()
const array1 = [1, 4, 9, 16];
const map1 = array1.map(x => x * 2);
console.log(map1);
//4.过滤数组，返回满足要求的数组
const words = ['spray', 'exuberant', 'destruction', 'present'];
const result = words.filter(word => word.length > 6);
console.log(result);

indexOf（）字符串、数组统用，返回指定字符首次出现的位置（索引值），返回这个索引值，否则返回-1

forEach（）：
针对数组而言的，对数组中的每个元素可以执行一次方法
仅遍历数组（item，index，arr），无返回值或返回值为undefined

map（）：数组遍历，返回新数组

filter（）：与map类似，返回新数组

some（）：返回布尔值，检测数组中是否有某一个值

every（）：返回布尔值，检测数组中所有元素是否都符合指定条件

reduce（()=>(prev,next,index)）
第一个参数是上一次前两个参数的和
第二个参数是下一个下标对应的元素
第三个参数是第二个参数的下标
```

- slice和splice虽然都是对于数组对象进行截取,但是二者还是存在明显区别,函数参数上slice和splice第一个参数都是截取开始位置,slice第二个参数是截取的结束位置(不包含),而splice第二个参数(表示这个从开始位置截取的长度),slice不会对原数组产生变化,而splice会直接剔除原数组中的截取数据!
-  **slice不会改变原数组，splice会改变原数组**

#### 22.1.map和forEach的区别

- 相同点
  - 都是循环遍历数组的每一项
  - 只能遍历数组
  - 都支持三个参数，item(当前项)，index(索引值)，arr(原数组)

- **map**
  - **map()会分配内存空间存储新数组并返回新数组，不改变原数组的值**
- **forEach**
  - **forEach()允许callback更改原始数组的值，但是不会返回数据**  

### 23.JS中数据类型的判断

#### 23.1 **typeOf**：可以精准判断基础数据类型

- typeof对于原始类型来说，除了null 都可以显示正确的类型

- typeof对于对象来说，除了函数都会显示object,所以说typeof并不能准确判断变量到底是什么类型,所以想判断一个对象的正确类型，这时候可以考虑使用instanceof

```js
console.log(typeof 2);               // number
console.log(typeof true);            // boolean
console.log(typeof 'str');           // string
console.log(typeof []);              // object     []数组的数据类型在 typeof 中被解释为 object
console.log(typeof function(){});    // function
console.log(typeof {});              // object
console.log(typeof undefined);       // undefined
console.log(typeof null);            // object     null 的数据类型被 typeof 解释为 object
```

#### 23.2 **instanceof**：可以精准判断引用数据类型

- 可以正确的判断对象的类型，因为**内部机制是通过判断对象的原型链中是不是能找到类型的 prototype**
- instanceof可以精准判断引用数据类型（Array，Function，Object），而基本数据类型不能被instanceof精准判断。

##### instanceof原理

-  **instanceof 主要的实现原理就是只要右边变量的 prototype 在左边变量的原型链上即可。**
- **instanceof 在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 prototype，如果查找失败，则会返回 false**

```js
console.log(2 instanceof Number);                    // false
console.log(true instanceof Boolean);                // false 
console.log('str' instanceof String);                // false  
console.log([] instanceof Array);                    // true
console.log(function(){} instanceof Function);       // true
console.log({} instanceof Object);                   // true    
// console.log(undefined instanceof Undefined);
// console.log(null instanceof Null);
```

#### 23.3.Object.prototype.toString.call()

- 可以精确判断是什么类型

### 24.什么是es6?es6新特性?

- ECMScript6 是javaScript语言在15年发布的的下一代标准；优点：提升JS编写大型的复杂应用程序的能力
- let和const命令
- 字符串扩展
- 解构表达式
- 箭头函数
- map和redus
- Map和Set
- promise
- for-of循环
- async、await

