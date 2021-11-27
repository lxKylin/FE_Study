### 什么是ajax

- 异步的javascript和xml

###  原生ajax请求的步骤

- 创建XMLHttpRequest 对象(需要考虑兼容性)

```js
var xhr=null;  
if (window.XMLHttpRequest)  
  {// 兼容 IE7+, Firefox, Chrome, Opera, Safari  
    xhr=new XMLHttpRequest();  
  } else{// 兼容 IE6, IE5 
    xhr=new ActiveXObject("Microsoft.XMLHTTP");  
} 
```

- 使用open方法规定请求的类型、URL 以及是否异步处理请求
  - method：请求的类型；GET 或 POST
  - url：文件在服务器上的位置
  - async：true（异步）或 false（同步） **注意：post请求一定要设置请求头的格式内容**

```js
xhr.open(method,url,async);
```

- setRequestHeader()方法设置请求头
  - 此方法必须在 open() 方法和 send() 之间调用
  - xhr.setRequestHeader(header,value)
  - header: 一般设置"Content-Type",传输数据类型，即：服务器需要我们传送的数据类型。
  - value: 具体的数据类型，常用"application/x-www-form-urlencoded"和"application/json"。

```js
// get方式不用设置，而post必须设置
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");  
```

- 使用send方法发送请求

```js
// get方式
// xhr.send(null);
// post方式
xhr.send("name=mh&age=18");
```

- 使用onreadystatechange属性，接受服务器响应数据

  - readyState是XMLHttpRequest对象的一个属性，用来标识当前XMLHttpRequest对象处于什么状态。

  - 0：未初始化 -- 尚未调用.open()方法；

    1：启动 -- 已经调用.open()方法，但尚未调用.send()方法；

    2：发送 -- 已经调用.send()方法，但尚未接收到响应；

    3：接收 -- 已经接收到部分响应数据；

    4：完成 -- 已经接收到全部响应数据，而且已经可以在客户端使用了；

```js
xhr.onreadystatechange = function (){
    if(this.readyState === 2){
       // 接收到响应头
       console.log("HEADERS_RECEIVED",xhr.readyState);
    }else if(this.readyState === 3){
        // 响应体加载中
       console.log("LOADING",xhr.readyState);
    }else if(this.readyState === 4){
        // 加载完成
        console.log("DONE",xhr.readyState);
    }
}
```

### json字符串转换集json对象、json对象转换json字符串

```js
//字符串转对象
JSON.parse(json)

// 对象转字符串
JSON.stringify(json)
```

### ajax几种请求方式

- 常用的post，get，delete

- get通过url传递参数 
- post设置请求头  规定请求数据类型

- post比get安全 (因为post参数在请求体中。get参数在url上面) 

- post传输文件大，理论上没有限制  get传输文件小大概7-8k ie4k左右 

- get获取数据	post上传数据 (上传的数据比较多  而且上传数据都是重要数据。所以不论在安全性还是数据量级 post是最好的选择)

  