function cloneDeep(obj){
  let newObj = null;   //声明一个变量用来储存拷贝之后的内容
   
  //判断数据类型是否是复杂类型，如果是则调用自己，再次循环，如果不是，直接赋值即可，
  //由于null不可以循环但类型又是object，所以这个需要对null进行判断
  if (typeof(obj) == 'object' && obj !== null) { 
   
    //根据参数的具体数据类型声明不同的类型来储存,数组还是对象
    newObj = obj instanceof Array ? [] : {};   
       
    // 是数组就进行for-in
    //循环obj 中的每一项，如果里面还有复杂数据类型，则直接利用递归再次调用cloneDeep函数
    for (let i in obj) {  
      newObj[i] = cloneDeep(obj[i])
    }
  }else{
    newObj = obj
  }    
  return newObj;    //函数必须有返回值，否则结构为undefined
}
