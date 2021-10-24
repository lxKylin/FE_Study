import observe from './observe.js';

import Watcher from './Watcher.js';

var obj = { // 有7个dep 对象 obj a m c d e g
  a: {
    m: {
      n: 5
    }
  },
  b: 10,
  c: {
    d: {
      e: {
        f: 6666
      }
    }
  },
  g: [22, 33, 44, 55]
};

// observe -> Observer -> defineReactive -> observe 形成递归
observe(obj);

new Watcher(obj, 'a.m.n', (val) => {
  console.log('我是watcher，我在监控a.m.n', val);
});

obj.a.m.n = 88;
obj.g.push(66);
console.log(obj);