### 1.Vue2.x生命周期

- 实例从创建到销毁的过程，就是生命周期。也就是从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。

- 它可以总共分为8个阶段：**创建前/后, 载入前/后,更新前/后,销毁前/销毁后**

  - **beforeCreate**：在new一个vue实例后，只有一些默认的生命周期钩子和默认事件，其他的东西都还没创建。在beforeCreate生命周期执行的时候，data和methods中的数据都还没有初始化。不能在这个阶段使用data中的数据和methods中的方法

  - **created**：data 和 methods都已经被初始化好了，**如果要调用 methods 中的方法，或者操作 data 中的数据，最早可以在这个阶段中操作**

  - **beforeMount**：执行到这个钩子的时候，在内存中已经编译好了模板了，但是还没有挂载到页面中，此时，页面还是旧的

  -  **mounted**：执行到这个钩子的时候，就表示Vue实例已经初始化完成了。此时组件脱离了创建阶段，进入到了运行阶段。 如果我们**想要通过插件操作页面上的DOM节点，最早可以在和这个阶段中进行**

  -  **beforeUpdate**： 当执行这个钩子时，页面中的显示的数据还是旧的，data中的数据是更新后的， 页面还没有和最新的数据保持同步

  - **updated**：页面显示的数据和data中的数据已经保持同步了，都是最新的

  - **beforeDestroy**：Vue实例从运行阶段进入到了销毁阶段，这个时候上所有的 data 和 methods ， 指令， 过滤器 ……都是处于可用状态。还没有真正被销毁

  - **destroyed**： 这个时候上所有的 data 和 methods ， 指令， 过滤器 ……都是处于不可用状态。组件已经被销毁了。


### 2.methods方法与computed计算属性对比

- computed计算属性会进行缓存，多次调用只会执行一次，性能得到优化

### 3.ES6对象字面量增强写法

- 理解：就是边声明边赋值

```js
//ES5的写法
const obj = {
  name: name,
  age: age,
  height: height,
  run:function(){}
}
//ES6的写法
const obj = {
  name,
  age,
  height,
  run(){}
}
```

### 4.v-on

#### 4.1传参问题

- 在事件定义时，写函数时省略了小括号，但是方法本身需要一个参数的，这时，vue会默认将浏览器产生的event事件对象作为参数传入到方法中

```js
<button @click="btn2Click">按钮2</button>
methods: {
  btn2Click(abc) {
  	console.log('-----',abc);
  },
}
```

- 在调用方法时，手动的获取到浏览器参数的event对象：$event
  - 在调用方法中时不能省略$​，否则会被当成变量

```js
<button @click="btn3Click(123,$event)">按钮3</button>
methods: {
  btn3Click(a,event) {
  	console.log('----',a,event);
  }
}
```

#### 4.2常用修饰符的使用

```js
<!--事件冒泡：先打印btnClick 后打印divClick-->

<div @click="divClick">
<button @click="btnClick">按钮1</button>
</div>

<!-- 阻止冒泡：只打印btnClick -->

<div @click="divClick">
<button @click.stop="btnClick">按钮2</button>
</div>

<!--阻止默认事件，可以用来阻止自动提交-->

<form action="baidu">
<input type="submit" value="提交" @click.prevent='submitClick'>
</form>

<!--监听键盘的键帽：回车之后再监听-->
<input type="text" @keyup.enter="keyup">
```

### 5.v-if与v-show条件为false时

- v-if：是从DOM中直接删除标签，只有一次切换时使用
- v-show：是添加了display:none，频繁切换时使用

### 6.v-for中遍历对象的几种情况

```js
<!--1.在遍历对象的过程中，如果只是获取一个值，那么获取到的是value-->

<ul>
	<li v-for="item in person"> {{item}} </li>
</ul>

<!--2.获取key 和value  格式：(value,key)-->

<ul>
	<li v-for="(value,key) in person"> {{value}} : {{key}} </li>
</ul>

<!--3.获取key 和value 及 index 格式：(value,key,index)-->

<ul>
	<li v-for="(value,key,index) in person"> {{index + 1}} - {{value}} : {{key}} </li>
</ul>

```

- **key属性值**
- :key ，给每个节点绑定一个唯一标识，使得函数内部性能更高，diff算法可以高效更新虚拟DOM
  这里不建议使用index(下标)作为key，一般使用id
- 一旦删除或添加一个数据，这个数据之后的所有数据下标值都会被改变，导致以前的数据和重新渲染后的数据随着 key 值的变化从而没法建立关联关系. 这就失去了 key 值存在的意义

### 7.数组方法

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
//3.映射数组，返回一个新数组
const array1 = [1, 4, 9, 16];
const map1 = array1.map(x => x * 2);
console.log(map1);
//4.过滤数组，返回满足要求的数组
const words = ['spray', 'exuberant', 'destruction', 'present'];
const result = words.filter(word => word.length > 6);
console.log(result);

indexOf（）字符串、数组统用，返回指定字符首次出现的位置（索引值），返回这个索引值，否则返回-1

forEach（）：仅遍历数组（item，index，arr），无返回值或返回值为undefined

map（）：数组遍历，返回新数组

filter（）：与map类似，返回新数组

some（）：返回布尔值，检测数组中是否有某一个值

every（）：返回布尔值，检测数组中所有元素是否都符合指定条件

reduce（()=>(prev,next,index)）
第一个参数是上一次前两个参数的和
第二个参数是下一个下标对应的元素
第三个参数是第二个参数的下标
```

### 8.v-module双向数据绑定实现原理

- v-module其实是一个语法糖

- 它主要做了两件事
  - 在input中绑定value` :value="message"`message是自定义的
  - input本身有个事件叫input，用于监听value的值，在input中监听这个事件，并给它赋值给message
- ` <input type="text" v-model="message">`等同于下面这句
- ` <input type="text" :value="message" @input="message = $event.target.value">`

```js
<div id="app">
  <!-- input本身有个事件叫input，用于监听value的值 -->
  <input type="text" :value="message" @input="change">
    <h2> {{message}} </h2>
</div>

<script src="../js/vue.js"></script>
<script>
  let vm = new Vue({
    el: '#app',
    data: {
      message:"v-module实现原理"
    },
    methods: {
      change(e) {
        this.message = e.target.value;
      }
    }
  });
</script>
```

### 9.v-module的修饰符

- lazy：延迟数据实时更新，当按回车或鼠标移除时再更新数据，像防抖

- number：在input中输入的都是string类型，想要输入数字不在进行类型转换可以使用number

```js
<div id="app">
  <!--1.修饰符 lazy 延迟数据实时更新，当按回车或鼠标移除时更新数据-->
  <input type="text" v-model.lazy="message">
  <h2>{{message}}</h2>
  <!--2. number  将类型转为number-->
  <input type="text" v-model.number="number">
  <h2>{{number}}- {{typeof number}}</h2>
</div>

<script src="../js/vue.js"></script>
<script>
  let vm = new Vue({
    el: '#app',
    data: {
    message: 'Vue',
    number: ''
  },
  });
</script>
```

### 10.组件中的数据存放

- 数据存放在data中，它必须是个函数，且返回一个对象

- 为什么data必须是个函数
  - 组件中的data写成一个函数，数据以函数返回值的形式定义，这样每次复用组件的时候，都会返回一份新的data，相当于每个组件实例都有自己私有的数据空间，它们只负责各自维护的数据，不会造成混乱。而单纯的写成对象形式，就是所有的组件实例共用了一个data，这样改一个全都改了

### 11.父子组件通信(传数据)

#### 11.1父传子：props

- **在子组件中使用props接收，使用v-bind绑定父组件传递的数据**
- props中可以使用数组或对象，一般对象使用得比较多
  - 使用对象，可以对父组件传递的数据进行限制，使用`type`限制类型，`default`设置默认值，`required:true/false`设置是否必须传入

```js
//子组件
props: {
  cInfo: {
    type: Object,
      default () {
        return {};
      },
  },
},
//父组件
<cpn :c-info="info"></cpn>
data: {
  info: {
    name: 'liux',
    age: 18,
    height: 188,
  },
},
```

#### 11.2子传父，自定义事件

- 在子组件中，methods中通过$emit()来抛出事件
- 在父组件中，通过v-on来监听子组件事件

```js
<cpn @item-click="cpnClick"></cpn>

methods: {
  btnClick(item){
    //这是一个自定义事件
    //发射给父组件   'itemClick'事件名称 item 传的参数
    this.$emit('item-click',item);
  }
},
  
methods: {
  cpnClick(item){
  	console.log(item);
  }
},
```

#### 11.3父子通信中input双向绑定问题

- 使用双向绑定时，v-model不能直接绑定子组件props中的数据，应该绑定在子组件data中(data中的数据指向props中的数据)
- **因为**：此时input中改变的值是data中的值，而props中的值是父组件传递过来的，并没有改变
- 所以子组件需要通过自定义事件**$emit()**将最新值发送给父组件，父组件监听事件进行接收数据
- 使用watch监听某个属性的改变

```js
<input type="text" :value="dnumber1">
<input type="text" :value="dnumber2">
data: {
  num1: 1,
  num2: 0
},
methods: {
  num1change(value) {
   	this.num1 = parseFloat(value)
   },
  num2change(value) {
  	this.num2 = parseFloat(value)
  }
},
  
cpn: {
  template: '#cpn',
  props: {
    number1: Number,
    number2: Number
  },
  data() {
    return {
      dnumber1: this.number1,
      dnumber2: this.number2
    }
  },
  watch: {
    dnumber1(newValue) {
      this.dnumber2 = newValue;
      this.$emit('num1change', newValue);
    },
    dnumber2(newValue) {
      this.dnumber1 = newValue;
      this.$emit('num2change', newValue);
    }
   }
  }
}
```

### 12.父子组件访问(调方法)

#### 12.1父访子：$refs用最多

- $children：数组类型，用得比较少

- **$​​refs**：对象类型，默认空对象，要在组件上加属性`ref=""`，这相当于key

#### 12.2：子访父：用得少

- $parent：访问父组件
- $root：访问根组件

### 13.插槽slot、v-slot

#### 13.1具名插槽v-slot:aa，简写#aa

```js
<cpn>
  <template v-slot:left>
  	<button >这样覆盖名字为left的slot</button>
  </template>
</cpn>
```

#### 13.2编译作用域

- 在`template`中的是组件内部编译作用域
- 可把组件名称当成div，是实例内部编译作用域

#### 13.3作用域插槽`v-slot="别名"`

- 父组件替换插槽的标签，但是内容由子组件来提供

```vue
//子组件 ： (假设名为：ebutton)
<template>
  <div class= 'button'>
      <button>  </button>
      <slot name= 'one' :value1='child1'> 这就是默认值1</slot>    //绑定child1的数据
      <slot :value2='child2'> 这就是默认值2 </slot>  //绑定child2的数据，这里我没有命名slot
  </div>           
</template>

new Vue({
  el:'.button',
  data:{
    child1:'数据1',
    child2:'数据2'
  }
})

//父组件：（引用子组件 ebutton）
<template>
  <div class= 'app'>
     <ebutton> 
        <template v-slot:one = 'slotone'>  
           {{ slotone.value1 }}    // 通过v-slot的语法 将子组件的value1值赋值给slotone 
        </template>
        <template v-slot:default = 'slottwo'> 
           {{ slottwo.value2 }}  // 同上，由于子组件没有给slot命名，默认值就为default
        </template>
     </ebutton>
  </div>
</template>
```

