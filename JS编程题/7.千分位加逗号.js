function foo (str) {
  return Number(str).toLocaleString()
}
console.log(foo(123567))
console.log(foo("123456789"))