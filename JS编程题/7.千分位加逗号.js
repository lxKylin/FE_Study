function foo (str) {
  return Number(str).toLocaleString()
}
console.log(foo(111222))
console.log(foo("123456789"))