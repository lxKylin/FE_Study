const bt = require('./03-bt-二叉树')

// 左右根
const arr = []
const postorder = (root) => {
  if (!root) return
  postorder(root.left)
  postorder(root.right)
  arr.push(root.val)
  return arr 
}

// 根右左 和先序有点像
// const postorder = (root) => {
//   if (!root) return
//   // 使用栈
//   const stack = [root]
//   const outputStack = []
//   while (stack.length) {
//     // 访问根节点
//     const n = stack.pop()
//     outputStack.push(n)
//     if (n.left) stack.push(n.left)
//     if (n.right) stack.push(n.right)
//   }
//   while(outputStack.length) {
//     const n = outputStack.pop()
//     console.log(n.val)
//   }
// }

console.log(postorder(bt))