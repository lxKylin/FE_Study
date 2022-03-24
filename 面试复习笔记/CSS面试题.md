### 1.link 和 @import 都能导入一个样式文件，它们有什么区别嘛？

- link 是 HTML 标签，除了能导入 CSS 外，还能导入别的资源，比如图片、脚本和字体等；而 @import 是 CSS 的语法，只能用来导入 CSS；

- link 导入的样式会在**页面加载时同时加载**，@import 导入的样式在**页面加载完成后再加载**；

- link 没有兼容性问题，@import 不兼容 ie5 以下；

- link 可以通过 JS 操作 DOM 动态引入样式表改变样式，而@import不可以

### 2.盒模型

- 由 4 部分组成的：内容（content）、内边距（padding）、边框（border）和外边距（margin）

#### 2.1标准盒模型` box-sizing:content-box`(默认使用)

- 盒子的实际尺寸 = 内容（设置的宽/高） + 内边距 + 边框

#### 2.2IE盒模型` box-sizing:border-box`

- 盒子的实际尺寸 = 设置的宽/高 = 内容 + 内边距 + 边框

- 不论内边距、边框如何改变，盒子的真实宽高都不会发生改变。(**优点**)

### 3.实现两栏布局的方式：

#### 3.1float + margin

```css
.aside {
  width: 300px;
  float: left; //right
}

.main {
	margin-left: 300px; //margin-right
}
```

#### 3.2flex

```css
.layout {
	display: flex;
}
.aside {
	width: 200px;
}
.main {
	flex: 1
}
```

### 4.实现三栏布局

#### 4.1圣杯(相对定位)

- 在三栏之外定义一个父级盒子

```css
.container {
	padding: 0 200px;
}
.content {
  float: left;
  width: 100%;
}
.left .right {
  position: relative;/ˈrelətɪv/
  width: 200px;
  float: left;
}
.left {
  margin-left: -100%;
  left: -200px;
}
.right {
  margin-left: -200px;
  right: -200px;
}
```

#### 4.2双飞翼

```css
.center{
  float: left;
  width: 100%;
}
.left, .right {
  float: left;
  width: 200px;
}
.left{
  margin-left: -100%;
}
.right{
  margin-left: -200px;
}
```

#### 4.3flex

```css
.layout {
	display: flex;
}
.aside {//放两边
	width: 200px;
}
.main {
	flex: 1;
}
```

### 5.水平垂直居中

#### 5.1固定宽高的块级盒子

##### 5.1.1absolute+margin

```css
.parent {
	position:relative;
}
.child {
	position:absolute;/ˈæbsəluːt/
	width:100px;
	height:100px;
  top:50%
	left:50%
	margin: -50px 0 0 -50px
}
```

#### 5.2不固定宽高的块级盒子

##### 5.2.1absolute+transfrom

- 1
```css
.parent {
	position:relative;
}
.child {
	position:absolute;
  top:50%
	left:50%
	transfrom:translate(-50%,-50%)
}
```
- 2、另外，如果父元素设置了flex布局，只需要给子元素加上`margin:auto;`就可以实现垂直居中布局
```css
.parent{
    display:flex;
}
.child{
    margin: auto;
}
```

- 3、利用绝对定位，设置四个方向的值都为 0，并将 margin 设置为 auto，由于宽高固定，因此对应方向实现平分，可以实现水平和垂直方向上的居中。该方法适用于盒子有宽高的情况：
```css
.parent {
    position: relative;
}

.child {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}
```

#### 5.3单行的文本、inline 或 inline-block 元素

- **水平居中**

  此类元素需要水平居中，则父级元素必须是块级元素(`block level`)，且父级元素上需要这样设置样式：

```css
.parent {
    text-align: center;
}
```

- **垂直居中**

  - align-items: center;

  方法一：通过设置上下内间距一致达到垂直居中的效果：

```css
.single-line {
    padding-top: 10px;
    padding-bottom: 10px;
}
```

​  方法二：通过设置 `height` 和 `line-height` 一致达到垂直居中：

```css
.single-line {
    height: 100px;
    line-height: 100px;
}
```

#### 使用flex布局实现水平垂直居中

```css
display: flex
justify-content: center
align-item: center
```



### 6.清除浮动

#### 6.1双伪元素法

```css
.clearfix:before,.clearfix:after {
    content:"";
    display: table;
}
.clearfix:after {
    clear: both;
}
.clearfix {
    *zoom:1;
}
```

#### 6.2` :after`伪元素法

```css
.clearfix:after {
    content:"";
    display: block;
    height:0;
    clear:both;
    visibility:hidden
}
.clearfix {
    *zoom:1;
}
```

### 7.CSS3新特性

- RGBA和透明度
- 文字阴影：text-shadow： 5px 5px 5px #FF0000;（水平阴影，垂直阴影，模糊距离，阴影颜色）
- 圆角
- 边框图片
- 渐变、过渡、动画
- 媒体查询
- 栅格布局、弹性布局

### 8.用纯CSS创建一个三角形的原理是什么？

- 首先宽高必须是 0px，通过边框的粗细来填充内容；
- 哪条边需要就要加上颜色，而不需要的边则用 transparent；
- 想要什么样姿势的三角形，完全由上下左右 4 条边的中有颜色的边和透明的边的位置决定；
- 等腰三角形：设置一条边有颜色，然后紧挨着的 2 边是透明，且宽度是有颜色边的一半
- 直角三角形：设置一条边有颜色，然后紧挨着的任何一边透明即可。

```css
width: 0;
height: 0;
border-top: 40px solid transparent;
border-left: 40px solid transparent;
border-right: 40px solid transparent;
border-bottom: 40px solid #ff0000;
```

### 9.格式化上下文

- BFC (Block Formatting Context) 块级格式化上下文
  - 只有块级盒子参与，它规定了内部的块级盒子垂直排列
  - 指一个独立的渲染区域或者说是一个隔离的独立容器。
- IFC (Inline Formatting Context) 行内格式化上下文
  - 子元素在水平方向上一个接一个排列

### 10.弹性布局

- **display: flex**
- **flex-grow属性(放大比例)**
  - flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大
  - 如果所有项目的flex-grow属性**都为1，则它们将等分剩余空间**（如果有的话）。
  - 如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

- **flex-shrink属性(缩小比例)**
  - flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

- **flex-basis属性(分配多余空间)**
  - flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的**默认值为auto，即项目的本来大小**

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

- **flex属性**(1, 1, auto)使用最多
  - flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

### 11.em和rem的区别

#### 11.1em

- em相对于**父元素**的 font-size 大小计算

#### 11.2rem

- rem 是相对于 html 的 font-size 来计算

### 12.长文本处理

#### 12.1单行文本超出省略

```css
.ellipsis {
	white-space: nowrap; //不换行
	overflow: hidden; //超出部分隐藏
	text-overflow: ellipsis; //文本超出部分省略号代替/ɪˈlɪpsɪs/
}
```

#### 12.2多行文本超出省略

```css
.line-clamp {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2; //两行
	-webkit-box-orient: vertical;
}
```

### 13.position定位

- static、relative（相对定位）、absolute（绝对定位）、fixed（固定定位）、sticky（粘贴定位）
- **相对定位relative：相对于自己原来的位置移动**
  - 指元素相对于标准文档流中的默认位置来进行定位的
  - 当position属性值设置为relative时，开启相对定位模式
  - 相对定位并不会让元素脱离标准流
  - 原来的位置也继续保留
- **绝对定位absolute：**原来的位置不保留
  - 相对于第一个父元素进行定位，如果没有就相对于页面定位
  - 把position属性值设置为absolute开启绝对定位模式
  - 被设置为绝对定位的元素会脱离标准流
  - 当多个绝对定位元素出现相互遮盖的情况时，可以使用z-index属性设置层级

### 14.响应式布局都有哪些

- flex弹性布局
- rem
- vw/vh

- 百分比%
- 媒体查询

### 15.display: none与visibility: hidden的区别

- visibility具有**继承性**，给父元素设置visibility:hidden;子元素也会继承这个属性。但是如果重新给子元素设置visibility: visible,则子元素又会显示出来。这个和display: none有着质的区别

- display:none 隐藏后的元素**不占据任何空间**，而 visibility:hidden 隐藏的元素**空间依旧存在**
- opacity: 0，隐藏的元素**空间依旧存在**，可触发绑定事件
- display:none 隐藏**产生回流和重绘**（reflow 和 repaint），而 visibility:hidden **只产生重绘**

- opacity: 0，透明度为0，即隐藏

### 16.CSS为什么初始化

- 因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异。