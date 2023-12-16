import { createClient } from 'redis';

const client = createClient({
  socket: {
    host: 'localhost',
    port: 6379
  }
});

client.on('error', (err) => console.log('Redis Client Error: ' + err));

await client.connect();

const values = await client.keys('*');

await client.hSet('test1', '111', 'value111');
await client.hSet('test1', '222', 'value222');
await client.hSet('test1', '333', 'value333');

console.log(values, 'values');

await client.disconnect();
