const tree = {
  val: 'a',
  children: [
    {
      val: 'b',
      children: [
        {
          val: 'd',
          children: []
        },
        {
          val: 'e',
          children: []
        }
      ]
    },
    {
      val: 'c',
      children: [
        {
          val: 'f',
          children: []
        },
        {
          val: 'g',
          children: []
        }
      ]
    }
  ]
}

let arr = []
const bfs = (root) => {
  // 新建一个队列，把根节点入队
  const q = [root]
  // 队列不为空的情况下
  while(q.length > 0) {
    // 队头出队(删除队头)，并访问
    const n = q.shift()
    arr.push(n.val)
    // 把队头的children挨个入队
    n.children.forEach(child => {
      q.push(child)
    });
  }
  return arr
}

console.log(bfs(tree))
