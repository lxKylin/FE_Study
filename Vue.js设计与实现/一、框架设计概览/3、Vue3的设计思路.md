# 第一篇 框架设计概览

## 第3章 Vue.js3的设计思路

### 1、虚拟DOM
- 用JavaScript对象来描述真实的DOM结构
- 举个例子
  - 分别采用`h1`到`h6`这几个标签
- js对象:
```js
let level = 3
const title = {
  tag: `h${level}`, // h3标签
}
```
  - 模版:
```html
<h1 v-if="level === 1"></h1>
<h2 v-else-if="level === 2"></h2>
<h3 v-else-if="level === 3"></h3>
<h4 v-else-if="level === 4"></h4>
<h5 v-else-if="level === 5"></h5>
<h6 v-else-if="level === 6"></h6>
```
- 模版没有js对象灵活

#### `Vue.js3`除了支持使用模板描述UI外，还支持使用虚拟`DOM`描述UI

- `Vue.js`组件中手写的渲染函数就是使用虚拟`DOM`来描述UI的
```js
import { h } from 'vue'

export default {
  render() {
    return h('h1', { onClick: handler }) // 虚拟 DOM
 }
}
```
- h函数改写js对象
```js
export default {
  render() {
    return {
      tag: 'h1',
      props: {onClick: handle}
    }
  }
}
```
- `h`函数的返回值就是一个对象，其作用是让我们编写虚拟`DOM`变得更加轻松
- 渲染函数（`render`）：
  - 一个组件要渲染的内容是通过渲染函数来描述的，也就是上面代码中的`render`函数，`Vue.js`会根据组件的`render`函数的返回值拿到虚拟`DOM`，然后就可以把组件的内容渲染出来了。 

### 2、渲染器

- 渲染器的作用就是把虚拟`DOM`渲染为真实`DOM`
- 精确地找到`vnode`对象的变更点并且只更新变更的内容
- 组件都是依赖渲染器来工作的
![渲染器作用](https://cdn.nlark.com/yuque/0/2022/png/23115285/1665991751742-51452585-1c36-42bb-8785-886659a375a8.png)

- 测试详见`test/1.虚拟DOM.html`

### 3、组件的本质

- 虚拟`DOM`除了能够描述真实`DOM`外，还能描述组件
- 组件就一组`DOM`元素的封装
- 这组`DOM`元素就是组件要渲染的内容，因此我们可以定义一个函数来代表组件，而函数的返回值就代表组件要渲染的内容:

```js
const MyComponent = function() {
  return {
    tag: 'div',
    props: {
      onClick: () => alert('Hello Kylin')
    },
    children: 'click me'
  }
}
```
- Vue.js 中的有状态组件就是使用对象结构来表达

### 4、编译器
