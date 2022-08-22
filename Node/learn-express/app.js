const express = require('express');
const fs = require('fs');
// 使用promise 避免回调地狱
const { promisify } = require('util');
// 将fs.readFile进行promise化
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const db = require('./db');

const app = express();

// 这样就能接收到客户端请求的urlencoded类型数据
// app.use(express.urlencoded());
// 这样就能接收到客户端请求的json类型数据
app.use(express.json());

/**
 * req: 请求对象
 * res: 响应对象
 */
app.get('/', async (req, res) => {
  try {
    const back = await db.getDb();
    // const back = await readFile('./db.json', 'utf8');
    // const jsonObj = JSON.parse(back);
    res.send(back.users);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// app.get('/', (req, res) => {
//   fs.readFile('./db .json', 'utf8', (err, data) => {
//     if (!err) {
//       const back = JSON.parse(data);
//       // express封装的方法，直接把数据转译并响应返回
//       res.send(back.users);
//     } else {
//       // 使用status给客户端以json形式返回错误
//       res.status(500).json({ err });
//     }
//   });
// });

app.post('/', async (req, res) => {
  // req.body包含了客户端请求的所有数据，需要判断客户端以什么格式请求
  // req.header查看请求头
  // console.log(req.headers);
  // console.log(req.body);
  const body = req.body;
  // !body && res.status(403).json({ error: '缺少用户信息' });
  if (!body) {
    res.status(403).json({ error: '缺少用户信息' });
  }

  const jsonObj = await db.getDb();
  // const back = await readFile('./db.json', 'utf8');
  // const jsonObj = JSON.parse(back);
  body.id = jsonObj.users[jsonObj.users.length - 1].id + 1;
  jsonObj.users.push(body);

  try {
    const writeBack = await db.saveDb(jsonObj);
    // const writeBack = await writeFile('./db.json', JSON.stringify(jsonObj));
    // !writeBack && res.status(200).json({ msg: '添加成功' });
    if (!writeBack) {
      res.status(200).json({ msg: '添加成功' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.put('/:id', async (req, res) => {
  try {
    const userInfo = await db.get();
    const userId = Number.parseInt(req.params.id);
    const user = userInfo.users.find((item) => item.id === userId);
    // !user && res.status(403).json({ error: '用户不存在' });
    if (!user) {
      res.status(403).json({ error: '用户不存在' });
    }
    const body = req.body;
    user.username = body.username ? body.username : user.username;
    user.age = body.age ? body.age : user.age;

    userInfo.users[userId - 1] = user;
    // !(await db.saveDb(userInfo)) && res.status(200).json({ msg: 成功 });
    if (!(await db.saveDb(userInfo))) {
      res.status(200).json({ msg: '修改成功' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(3303, () => {
  console.log(`run http://localhost:3303`);
});
