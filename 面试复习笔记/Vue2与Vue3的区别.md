### 1.OptionsAPI更换成CompositionAPI

- OptionsAPI当组件代码很多时，如果增加需求，要在 data、methods、computed 以及 mounted 中反复的跳转
- CompositionAPI将零散分布的逻辑组合在一起来维护，并且还可以将单独的功能逻辑拆分成单独的文件

#### 1.1.setup函数

- setup 是 Vue3.x 新增的一个选项， 他是组件内使用 `Composition API`的入口
- setup 执行时机是在 beforeCreate 之前执行
- **setup中不能访问this**
- setup函数接收两个参数
  - props：响应式的
  - context：this中最常用的三个属性值，可解构成{attrs, slot, emit}

#### 1.2.响应式APIreactive、ref 与 toRefs

- 这些方法都需要从vue中导入
- 在 **vue2.x** 中， 定义数据都是在`data`中， 但是 **Vue3.x** 可以使用`reactive`和`ref`来进行数据定义
- reactive：只能处理复杂对象类型的双向绑定
- ref：既能处理对象类型的双向绑定，也能处理基本类型的双向绑定，进行操作时需要` .value`才可以
  - ref返回的响应式对象是只包含一个名为value参数的RefImpl对象，在js中获取和修改都是通过它的value属性；
  - 但是在模板中被渲染时，自动展开内部的值，因此不需要在模板中追加`.value`
- toRefs ：将一个 reactive 对象转化为属性全部为 ref 对象的普通对象

```vue
<template>
  <div class="homePage">
    <p>第 {{ year }} 年</p>
    <p>姓名： {{ nickname }}</p>
    <p>年龄： {{ age }}</p>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, toRefs } from "vue";
export default defineComponent({
  setup() {
    const year = ref(0);
    const user = reactive({ nickname: "xiaofan", age: 26, gender: "女" });
    setInterval(() => {
      year.value++;
      user.age++;
    }, 1000);
    return {
      year,
      // 使用reRefs
      ...toRefs(user),
    };
  },
});
</script>

```

#### 1.3.生命周期的变化

- 使用生命周期都需要从vue中导入，需要加上“on”
- setup在beforeCreate之前执行

![image-20211005102218332](C:\Users\11594\AppData\Roaming\Typora\typora-user-images\image-20211005102218332.png)

#### 1.4.响应式侦听watch 与 watchEffect 的用法

```
watch(source, callback, [options])
```

- source: 可以支持 string,Object,Function,Array; 用于指定要侦听的响应式变量

- callback: 执行的回调函数

- options：支持 deep、immediate 和 flush 选项。

  

- watchEffect不需要手动传入依赖

- 每次初始化时watchEffect都会执行一次回调函数来自动获取依赖

- watchEffect无法获取到原值，只能得到变化后的值

```js
import { defineComponent, ref, reactive, toRefs, watch } from "vue";
export default defineComponent({
  setup() {
    //侦听 reactive 定义的数据
    const state = reactive({ nickname: "Kylin", age: 20 });
		let year = ref(0)
    
    setTimeout(() => {
      state.age++;
      year.value++
    }, 1000);

    // 修改age值时会触发 watch的回调
    watch(
      () => state.age,
      (newAge, oldAge) => {
        console.log("新值:", newAge, "老值:", olAge);
      }
    );
    
    watchEffect(() => {
        console.log(state);
        console.log(year);
      }
    );
    
    //侦听 ref 定义的数据
    const year = ref(0);

    setTimeout(() => {
      year.value++;
    }, 1000);

    watch(year, (newVal, oldVal) => {
      console.log("新值:", newVal, "老值:", oldVal);
    });


    return {
      ...toRefs(state),
    };
  },
});

```

### 2.Vue3可以自定义hooks

- 约定这些「自定义 Hook」以 use 作为前缀，和普通的函数加以区分

### 3.简单对比vue2.x 与 vue3.x 响应式

- `Object.defineProperty`只能劫持对象的属性， 而 Proxy 是直接代理对象
  - `Object.defineProperty`只能劫持对象属性，需要遍历对象的每一个属性，如果属性值也是对象，就需要递归进行深度遍历。
  - Proxy 直接代理对象， 不需要遍历操作
- `Object.defineProperty`只对初始对象里的属性有监听作用，对新增属性需要手动进行`Observe`
  - `Object.defineProperty`劫持的是对象的属性，所以新增属性时，需要重新遍历对象， 对其新增属性再次使用`Object.defineProperty`进行劫持。
  - 而Proxy不仅对初始对象的属性有监听作用，对新增的也有

### Vue3.2新特性

- ` script setup`
  - 不需要写`return`
- 没有了` setup`函数，提供了三个新的API
  - ` defineProps`用来接收父组件传来的值` props`
  - ` defineEmit`用来声明触发的事件表
  - ` useContext`用来获取组件的上下文` context`

### slot插槽用法变更

- 在 Vue2.x 中具名插槽和作用域插槽分别使用`slot`和`slot-scope`来实现， 
- 在 Vue3.0 中将`slot`和`slot-scope`进行了合并统一使用

```js
// 子组件
<slot name="content" :data="data"></slot>
export default {
    data(){
        return{
            data:["走过来人来人往","不喜欢也得欣赏","陪伴是最长情的告白"]
        }
    }
}
//Vue2
<!-- 父组件中使用 -->
<template slot="content" slot-scope="scoped">
    <div v-for="item in scoped.data">{{item}}</div>
<template>

//Vue3
<!-- 父组件中使用 -->
 <template v-slot:content="scoped">
   <div v-for="item in scoped.data">{{item}}</div>
</template>

<!-- 也可以简写成： -->
<template #content="{data}">
    <div v-for="item in data">{{item}}</div>
</template>

```

### v-model升级

- 同一组件可以同时设置多个 `v-model`
- 在自定义组件上使用`v-model`, 相当于传递一个`modelValue` 属性， 同时触发一个`update:modelValue`事件

```
<modal v-model="isVisible"></modal>
<!-- 相当于 -->
<modal :modelValue="isVisible" @update:modelValue="isVisible = $event"></modal>
```

- 如果要绑定属性名， 只需要给`v-model`传递一个参数就行, 同时可以绑定多个`v-model`：

```
<modal v-model:visible="isVisible" v-model:content="content"></modal>

<!-- 相当于 -->
<modal
    :visible="isVisible"
    :content="content"
    @update:visible="isVisible"
    @update:content="content"
/>
```

### 新增组件

- Teleport/ˈtelɪpɔːt/
  - 传送：可以将插槽中的元素或者组件传送到页面的其他位置：
- Suspense /səˈspens/
  - 它允许我们的程序在等待异步组件时渲染一些后备的内容，可以让我们创建一个平滑的用户体验

- Fragment
  - Vue2的template中需要根元素，在Vue3中不需要了

### 自定义指令

在 Vue 3 中对自定义指令的 API 进行了更加语义化的修改， 就如组件生命周期变更一样， 都是为了更好的语义化， 变更如下：

![image-20211010092932964](C:\Users\11594\AppData\Roaming\Typora\typora-user-images\image-20211010092932964.png)

```js
const { createApp } from "vue"

const app = createApp({})
app.directive('focus', {
    mounted(el) {
        el.focus()
    }
})
```

