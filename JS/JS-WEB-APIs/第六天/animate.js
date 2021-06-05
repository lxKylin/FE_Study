// let obj = {};
        // obj.name = 'andy';
        // 简单动画函数封装 obj目标对象 target目标位置
        function animate(obj, target,callback) {
            // 给不同的孩子设置了不同的定时器
            // 当我们不断点击按钮，这个元素的速度会越来越快，因为开启了太多定时器
            // 解决方法是 让我们元素只有一个定时器执行
            // 先清除以前的定时器 只保留当前的定时器
            clearInterval(obj.clear);
            obj.clear = setInterval(function(){
                // 步长值写到定时器的里面
                // 把我们步长值改为整数 不要出现小数问题
                //正值向上取整 负值向下取整
                // const step = Math.ceil((target - obj.offsetLeft) / 10);
                let step = (target - obj.offsetLeft) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                if (obj.offsetLeft == target ) {
                clearInterval(obj.clear);
                // 回调函数写到定时器里面
                if (callback) {
                    callback();
                }
                }else {
                // 把每次加1 这个步长值改为一个慢慢变小的值 步长公式：（目标值 - 现在的位置）/ 10
                obj.style.left = obj.offsetLeft + step + 'px';
                }
            },30)
        }