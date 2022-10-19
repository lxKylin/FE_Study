// 虚拟DOM
const vnode = {
  tag: 'div',
  props: {
    onClick: () => alert('hello Kylin')
  },
  children: 'click me'
};
// tag用来描述标签名称，所以tag: 'div'描述的就是一个 <div> 标签。
// props 是一个对象，用来描述 <div> 标签的属性、事件等内容。 可以看到，我们希望给 div 绑定一个点击事件。
// children 用来描述标签的子节点。在上面的代码中，children 是一个字符串值，意思是 div 标签有一个文本子节点: <div>click me</div>

// 渲染器
/**
 * @param {虚拟DOM对象} vnode
 * @param {真实DOM对象，作为挂载点，将虚拟DOM挂载在该载点下} container
 */
function renderer(vnode, container) {
  // 使用vnode.tag作为标签名创建DOM元素
  const el = document.createElement(vnode.tag);
  // 遍历vnode.props，将属性、事件添加到DOM元素
  for (const key in vnode.props) {
    if (/^on/.test(key)) {
      // 如果key以 on 开头，说明是事件
      el.addEventListener(
        key.substring(2).toLowerCase(), // 事件名称
        vnode.props[key]
      ); // 事件处理函数
    }

    // 处理children
    if (typeof vnode.children === 'string') {
      // 如果 children 是字符串，说明它是元素的文本子节点
      el.appendChild(document.createTextNode(vnode.children));
    } else if (Array.isArray(vnode.children)) {
      // 递归地调用 renderer 函数渲染子节点，使用当前元素 el 作为挂载点
      vnode.children.forEach((child) => renderer(child, el));
    }

    // 将元素添加到挂载点下
    container.appendChild(el);
  }
}
renderer(vnode, document.body); // body 作为挂载点
