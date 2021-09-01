// function urlToObj(str){
//   let obj = {}; //创建一个空对象存储
//   let arr1 = str.split("?")[1]; //按"?"分割为数组，并取下标为1的值
//   let arr2 = arr1.split("&"); //将arr1按"&"分割为数组
//   // console.log(arr2) //[ 'ie=utf-8', 'f=3', 'rsv_bp=1', 'tn=baidu', 'wd=%E7%99%BE%E5%BA%A6' ]
//   for (let i = 0 ; i < arr2.length; i++) {
//     let res = arr2[i].split("="); //将arr2数组遍历，一个个按"="分割
//     obj[res[0]] = res[1];
//   }
//   return obj;
// }
// console.log(urlToObj('https://www.baidu.com/?ie=utf-8&f=3&rsv_bp=1&tn=baidu&wd=%E7%99%BE%E5%BA%A6'))
// //{ie: "utf-8", f: "3", rsv_bp: "1", tn: "baidu", wd: "%E7%99%BE%E5%BA%A6"}

function fenG(str) {
  let obj = {}
  let arr = str.split('?')[1].split('&')
  for (let i = 0; i < arr.length; i++) {
    let res = arr[i].split('=')
    obj[res[0]] = res[1]
  }
  return obj
}
console.log(fenG("www.baidu.com?a=1&b=2&c=3"))