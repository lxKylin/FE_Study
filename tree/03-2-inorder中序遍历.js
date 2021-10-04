const bt = require('./03-bt-二叉树')

// 左根右
const arr = []
const inorder = (root) => {
  if (!root) return 
  inorder(root.left)
  arr.push(root.val)
  inorder(root.right)

  return arr
}

// const inorder = (root) => {
//   if (!root) return
//   // 使用栈
//   const stack = []
//   let p = root
//   while (stack.length || p) {
//     while(p) {
//       stack.push(p)
//       p = p.left
//     }
//     const n = stack.pop()
//     console.log(n.val)
//     p = n.right
//   }
// }

console.log(inorder(bt))