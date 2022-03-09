- state推荐写成函数，和data比较相似

### Vuex使用单一状态树(单一数据源)

- 用一个对象包含了全部的应用层级状态
- 每个应用仅有一个store实例

### 在模块中，getter和mutation及action怎么访问全局的state和getter

- 在getter中可以通过第三个参数rootState访问到全局的state，可以通过第四个参数rootGetters访问全局getter
- 在mutation中不可以访问全局的state和getter，只能访问到局部的state
- 在action中第一个参数context.rootState访问全局的state，context.rootGetters访问全局的getter

### 在setup中使用mapState

- 封装一个hooks

```js
// 在setup中使用mapState的hooks
import { computed } from 'vue';
import { mapState, useStore } from 'vuex'

export function useState(mapper) {
  // 拿到store对象
  const store = useStore()

  // 获取到对应的对象的function {counter: function, name: function, age: function}
  const storeStateFns = mapState(mapper)
  // 这些对应的是一个个对象， 函数

  // 对数据进行转换 {counter: ref, name: ref, age: ref}
  const storeData = {}

  // 使用Object.keys获取storeStateFns的key值
  // 在使用forEach遍历每一个key
  Object.keys(storeStateFns).forEach(fnKey => {
    // 取出storeStateFns中的函数，调用函数的bind绑定一个this，fn就有了this，
    // 这个this必须是个对象，且需要有$store属性，且需要个值
    const fn = storeStateFns[fnKey].bind({$store: store});
    // 取出的函数用computed包裹，根据key重新赋值给storeData
    storeData[fnKey] = computed(fn);
  })

  return storeData
}
```

- 组件中使用

```vue
<template>
  <div>
    <h2>Home: {{$store.state.counter}}</h2>

    <h2>Home: {{counter}}</h2>
    <h2>Home: {{name}}</h2>
    <h2>Home: {{age}}</h2>
    
  </div>
</template>

<script>
  import { useState } from '../hooks/useState'
  export default {
    // CompositionAPI
    setup() {
      const storeState = useState(["counter", "name", "age"])

      return {
        ...storeState
      }
    }
  }
</script>
```

### 在Vuex中使用mapState和mapGetters的hooks

```js
// useMapper.js 核心
import { computed } from 'vue';
import { useStore } from 'vuex'

// mapper传入的, mapFn是使用的map方法
export function useMapper(mapper, mapFn) {
  // 拿到store对象
  const store = useStore()

  // 获取到对应的对象的function {counter: function, name: function, age: function}
  const storeDataFns = mapFn(mapper)
  // 这些对应的是一个个对象， 函数

  // 对数据进行转换 {counter: ref, name: ref, age: ref}
  const storeData = {}

  // 使用Object.keys获取storeGettersFns的key值
  // 在使用forEach遍历每一个key
  Object.keys(storeDataFns).forEach(fnKey => {
    // 取出storeDataFns中的函数，调用函数的bind绑定一个this，fn就有了this，
    // 这个this必须是个对象，且需要有$store属性，且需要个值
    const fn = storeDataFns[fnKey].bind({$store: store});
    // 取出的函数用computed包裹，根据key重新赋值给storeData
    storeData[fnKey] = computed(fn);
  })

  return storeData
}
```

#### mapState的使用

```js
// 在setup中使用mapState的hooks
import { mapState, createNamespacedHelpers } from 'vuex'
import { useMapper } from './useMapper'

// 传入一个模块名
export function useState(moduleName, mapper) {
  let mapperFn = mapState
  // 判断传入的模块名是否是String类型，且长度不为0
  if (typeof moduleName === 'string' && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapState
  } else {
    mapper = moduleName
  }
  return useMapper(mapper, mapperFn)
}
```

#### mapGetters的使用

```js
// 在setup中使用mapGetters的hooks
import { mapGetters, createNamespacedHelpers } from 'vuex'
import { useMapper } from './useMapper'

export function useGetters(moduleName, mapper) {
  let mapperFn = mapGetters
  if (typeof moduleName === 'string' && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapGetters
  } else {
    mapper = moduleName
  }
  return useMapper(mapper, mapperFn)
}
```

#### 应用

```js
<template>
  <div>
    <h2>{{homeCounter}}</h2>
    <h2>{{doubleHomeCounter}}</h2>
    <hr>
    <!-- 没加namespaced: true,的写法 -->
    <!-- <h2>{{$store.getters.doubleHomeCounter}}</h2> -->
    <!-- 加了namespaced: true,后的写法 -->
    <h2>{{$store.getters["home/doubleHomeCounter"]}}</h2>
  </div>
</template>

<script>
  // 写法三
  import { createNamespacedHelpers } from 'vuex'
  const { mapState, mapGetters } = createNamespacedHelpers("home")
  
  import { useState, useGetters } from '../hooks/index'

  export default {

    setup() {
      const state = useState("home", ["homeCounter"])
      const getters = useGetters("home", ["doubleHomeCounter"])

      return {
        ...state,
        ...getters
      }
    }
  }
</script>

<style scoped>

</style>
```

