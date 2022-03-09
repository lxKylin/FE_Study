### 1.OptionsAPI的弊端

Vue2中的编写组件的方式

- 在对应属性中编写对应功能模块

- data，methods，watch，computed...

- 弊端
  - 实现一个功能时，这个功能对应的代码逻辑会被拆到各个属性中
  - 当组件变得更大、更复杂时，逻辑关注点的列表就会增长，同一个功能的逻辑就会被拆分得很分散

### 2.CompositionAPI

- 没有this, 没有指向当前组件实例
- setup被调用前，data，computed，methods等都没被解析
- 将同一个逻辑关注 点相关的代码收集在一起

#### 2.1` setup`函数有哪些参数

- 参数一：props,父组件传过来的属性

- 参数二：context,包含三个属性
  - attrs
  - slots:父组件传过来的插槽
  - emit:组件内部发出的事件时使用，setup中没有绑定this，this.$emit无法使用

#### 2.2` setup`函数的返回值

- 可以在模版` template`中被使用
- 也就是说可以通过` setup`返回值来代替` data`选项

#### 2.3reactiveAPI

- 果想为在setup中定义的数据提供响应式的特性，那么我们可以使用reactive的函数：
- 使用reactive函数处理我们的数据之后，数据再次被使用时就会进行依赖收集

```vue
<template>
  <div>
    <h2>当前计数：{{state.count}}</h2>
    <button @click="add">+1</button>
  </div>
</template>

<script>
  // 响应式函数
  import {reactive} from 'vue'
  export default {
    setup(props, {attrs, slots, emit}) {
      // 响应式函数包裹
      const state = reactive({
        count: 100,
      })
      
      // 局部函数
      const add = () => {
        state.count++;
        // console.log(state.count);
      }
      // 返回值来代替data选项
      return {
        state,
        add,
      }
    }
  }
</script>

<style scoped>

</style>
```

#### 2.4refAPI

- ref 会返回一个可变的响应式对象，该对象作为一个 响应式的引用 维护着它内部的值，这就是ref名称的来源； 它内部的值是在ref的 value 属性中被维护的

```vue
<template>
  <div>
    <!-- 当在template模版中使用ref对象，它会自动解包，不用写.value -->
    <h2>当前计数：{{count}}</h2>
    <button @click="add">+1</button>
  </div>
</template>

<script>
  import {ref} from 'vue'
  export default {
    setup(props, {attrs, slots, emit}) {
      // count变成一个ref的可响应式的引用
      let count = ref(0);
      
      // 局部函数
      const add = () => {
        count.value++;
        // console.log(count.value);
      }
      // 返回值来代替data选项
      return {
        count,
        add,
      }
    }
  }
</script>
<style scoped>

</style>
```

### 3.高级语法补充

### 4.methods在setup(){}中的使用方法

- 在vue-router中，无法使用this的情况

```js
import {useRouter} from 'vue-router'
export default {
    // methods: {
    //   jumpToAbout() {
    //     this.$router.push('/about')
    //   }
    // },
    setup() {
      const router = useRouter()
      const jumpToAbout = () => {
        router.push('/about')
      }
      return {
        username,
        jumpToAbout
      }
    }
  }
```



```vue
<template>
  <div>
    <h2>当前计数：{{state.count}}</h2>
    <button @click="add">+1</button>
  </div>
</template>

<script>
  // 响应式函数
  import {reactive} from 'vue'
  export default {
    setup() {
      // 响应式函数包裹
      const state = reactive({
        count: 100,
      })
      
      // 局部函数 OptionsAPI中的methods
      const add = () => {
        state.count++;
        // console.log(state.count);
      }
      // 返回值来代替data选项
      return {
        state,
        add,
      }
    }
  }
</script>

<style scoped>
</style>
```

### 5.computed及watch在setup(){}中的使用

```vue
<template>
  <div>
    <p>{{ measure }}</p>
  </div>
</template>
<script>
import {  ref, computed } from 'vue'
 
export default ({
  name: '',
  setup(){
    const radius = ref(2) // 半径
    const measure = computed(() => { // 圆的面积
      return 3.1 * radius.value * radius.value
    })
    return {
      measure
    }
  }
})
</script>
```

```vue
<template>
  <div>
    <p>{{ `${name.firstName}-${name.lastName}` }}</p>
    <button @click="changeName">ChangeName</button>
  </div>
</template>
<script>
import { defineComponent, ref, watch } from 'vue'
 
export default defineComponent({
  name: '',
  setup(){
    // 姓名
    const name = ref({
      firstName: 'L',
      lastName: 'M'
    })
 
    // function: changeName
    function changeName () {
      name.value.lastName = 'YZ'
    }
 
    // 监听到name发生变化，进行打印
    watch(name, (oldVal, newVal) => {
      console.log(oldVal)
      console.log(newVal)
      console.log(name.value)
    }, {
      deep: true // name是一个对象，需要进行深度监听
    })
    
    return {
      name,
      changeName
    }
  }
})
</script>
```

