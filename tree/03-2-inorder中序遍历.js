const bt = require('./03-bt-二叉树')

// 左根右递归 会遇到栈溢出的情况
// const arr = []
// const inorder = (root) => {
//   if (!root) return 
//   inorder(root.left)
//   arr.push(root.val)
//   inorder(root.right)

//   return arr
// }

// 非递归
const inorder = (root) => {
  if (!root) return []
  let arr = []
  // 使用栈
  const stack = []
  let p = root
  while (stack.length || p) {
    while(p) {
      stack.push(p)
      p = p.left
    }
    const n = stack.pop()
    arr.push(n.val)
    p = n.right
  }
  return arr
}

console.log(inorder(bt))