// 用函数表示组件
const MyComponent = function () {
  return {
    tag: 'div',
    props: {
      onClick: () => alert('Hello Kylin')
    },
    children: 'click me'
  };
};

// 用对象表示组件
const MyComponentObj = {
  render() {
    return {
      tag: 'div',
      props: {
        onClick: () => alert('Hello Kylin')
      },
      children: 'click me'
    };
  }
};

// 虚拟DOM
const vnode = {
  tag: MyComponent
  // tag: MyComponentObj
};

// 渲染器
function renderer(vnode, container) {
  if (typeof vnode.tag === 'string') {
    // 说明vnode描述的是标签元素
    mountElement(vnode, container);
  } else if (typeof vnode.tag === 'function') {
    // 说明vnode描述的是组件
    mountComponent(vnode, container);
  } else if (typeof vnode.tag === 'object') {
    mountObject(vnode, container);
  }
}
/**
 * @param {虚拟DOM对象} vnode
 * @param {真实DOM对象，作为挂载点，将虚拟DOM挂载在该载点下} container
 */
function mountElement(vnode, container) {
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

// 用函数表示组件
function mountComponent(vnode, container) {
  // 调用组件函数，获取组件要渲染的内容（虚拟DOM）
  const subtree = vnode.tag();
  // 递归调用renderer 渲染 substree
  renderer(substree, container);
}

// 用对象表示组件
function mountObject(vnode, container) {
  // vnode.tag 是组件对象，调用它的 render 函数得到组件要渲染的内容（虚拟DOM）
  const subtree = vnode.tag.render();
  // 递归调用renderer 渲染 substree
  renderer(substree, container);
}

renderer(vnode, document.body); // body 作为挂载点
