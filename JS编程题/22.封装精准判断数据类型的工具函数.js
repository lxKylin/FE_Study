function getType(obj) {
  const type = typeof obj;
  // 先进行typeof判断，如果是基础数据类型，直接返回
  if (type !== 'object') {
    return type;
  }
  // 如果是引用类型，再进行如下的判断，正则返回结果
  return Object.prototype.toString
  .call(obj)
  .replace(/^\[object (\S+)\]$/, '$1')
  .toLocaleLowerCase();
}

getType(true)         // boolean
getType(1)            // number
getType('1')          // string
getType(1n)           // bigint
getType(null)         // null
getType(undefined)    // undefined
getType(Symbol('a'))  // symbol

getType([])            // array
getType({})            // object
getType(function() {}) // function
getType(new Date())    // date
getType(/abc/)         // regexp
getType(new Error())   // error
getType(document)      // htmldocument
getType(window)        // window
