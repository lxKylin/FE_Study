/**
 * 链表：
 *    多个元素组成的列表
 *    元素存储不连续，使用next指针连在一起
 * 数组：增删非首尾元素时往往需要移动元素
 * 链表：增删非首尾元素，不需要移动元素，只需要更改next指向
 * 
 * JS中没有链表，可以使用Object模拟链表
 */
const a = {value: 'a'}
const b = {value: 'b'}
const c = {value: 'c'}
const d = {value: 'd'}

a.next = b
b.next = c
c.next = d

// 遍历链表
// 声明一个指针p，等于a
let p = a
while (p) {
  console.log(p.value);
  // 将p指向下一个
  p = p.next
}

// 在c和d之间插入值，更改next指向
const e = {value: 'e'}
c.next = e
e.next = d

// 删除e，更改next指向
c.next = d
