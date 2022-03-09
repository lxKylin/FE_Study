### 创建路由对象

- 和Vue2不一样

```js
// 创建路由对象
const router = createRouter({
  // 设置路由模式 createWebHistory  createWebHashHistory
  history: createWebHistory(),
  routes
})
```

### 5.router-link的v-slot

- router-link的tag属性被移除，**使用更加灵活的v-slot来定制渲染内容**

```html
<template>
  <div id="nav">
    <!-- <router-link to="/home" active-class="Kylin-active">Home</router-link>   -->
    <router-link to="/home" active-class="Kylin-active">
      <!-- 默认插槽 -->
      <!-- <button>首页</button> -->
      <!-- 组件 -->
      <nav-bar title="首页"/>
    </router-link>  

    <!-- 作用域插槽 -->
    <!-- 
      props: href(跳转的链接) 
      props: route(路由对象)
      props: navigate(导航函数)
      custom 整个元素自定义，不再有a元素包裹
    -->
    <router-link to="/home" v-slot="props" custom active-class="Kylin-active">
      <button>{{props.href}}</button>
      <button @click="props.navigate">Kylin</button>
    </router-link>  
    <router-link to="/about" active-class="Kylin-active">About</router-link>

    <!-- params传参 在路由中使用$route.params.username 获取传递的参数 -->
    <router-link :to="'/user/' + username" active-class="Kylin-active">User</router-link>
    
    <button @click="jumpToAbout">关于</button>
  </div>
  <router-view/>
</template>
```

### 6.router-view的v-slot

- 可以用于<transition>  和 <keep-alive> 组件来包裹你的路由组件

```html
<router-view v-slot="props">
  <transition name="Kylin">
    <keep-alive>
    	<component :is="props.Component"></component>
    </keep-alive>
  </transition>
</router-view>
```

### 7.动态添加路由

```js
// 动态添加路由
const categoryRouter = {
  path: "/category",
  component: () => import('../pages/Category.vue')
}

// 添加顶级路由对象
// if () {
  router.addRoute(categoryRouter)
// }

// 添加二级路由对象
router.addRoute("home", {
  path: 'message',
  component: () => import('../pages/HomeMessage.vue')
})
```

### 8.导航守卫

```js
// 导航守卫，4版本开始，next不推荐使用
// to: 即将跳转到的Route对象
// from: 从哪一个路由对象跳转过来的
/**
 * 返回值问题
 * 1.false 不进行导航
 * 2.undefined 或者不写返回值，进行默认导航
 * 3.字符串(路径)，跳转到对应的路径
 * 4.对象，类似于 router.push({path: "/login", query:....})
 */
router.beforeEach((to, from) => {

  // return false //拦截跳转
  if (to.path !== "/login") {
    return "/login"
  }
})
```

### historyApiFallback: true

- 解决用户刷新出现404问题
- Vue脚手架内部配置好了
