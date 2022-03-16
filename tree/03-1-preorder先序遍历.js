const bt = require('./03-bt-二叉树')

// 根左右，递归 会遇到栈溢出的情况
// const arr = []
// const preorder = (root) => {
//   // 如果根节点为空，直接返回
//   if (!root) return 
//   // 访问根节点
//   arr.push(root.val)
//   // 对根节点的左子树进行先序遍历
//   preorder(root.left)
//   // 对根节点的右子树进行先序遍历
//   preorder(root.right)
//   return arr
// }

// 非递归
const preorder = (root) => {
  if (!root) return []
  let arr = []
  // 使用栈 存储根节点
  const stack = [root]
  while (stack.length) {
    // 访问根节点
    // pop删除最后一个元素，并返回该元素
    const n = stack.pop()
    arr.push(n.val)
    // 栈是后进先出
    // 所以先加入栈的是右子树，然后左子树
    if (n.right) stack.push(n.right)
    if (n.left) stack.push(n.left)
  }
  return arr
}

console.log(preorder(bt))