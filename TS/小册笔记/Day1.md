## 插件

- **TypeScript Importer**：收集你项目内所有的类型定义，在你敲出`:`时提供这些类型来进行补全。如果你选择了一个，它还会自动帮你把这个类型导入进来
- **Move TS**：通过编辑文件的路径，直接修改项目的目录结构
- **Error Lens**：把你的 VS Code 底部问题栏的错误下直接显示到代码文件中的对应位置

## TS文件的快速执行

- **ts-node**

```shell
npm i ts-node typescript -g
```

- **ts-node-dev**
  - 支持自动地监听文件变更然后重新执行
  - ts-node-dev 基于 [node-dev](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ffgnass%2Fnode-dev)（你可以理解一个类似 nodemon 的库，提供监听文件重新执行的能力） 与 [ts-node](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FTypeStrong%2Fts-node) 实现，并在重启文件进程时共享同一个 TS 编译进程，避免了每次重启时需要重新实例化编译进程等操作。

```shell
npm i ts-node-dev -g
```

## null和undefined

- 在 TypeScript 中，`null` 与 `undefined` 类型都是**有具体意义的类型**
- 在没有开启 `strictNullChecks` 检查的情况下，会**被视作其他类型的子类型**，比如 `string` 类型会被认为包含了 `null` 与 `undefined` 类型
- `void` 表示一个空类型，而 `null` 与 `undefined` 都是一个具有意义的实际类型

## 元组（Tuple）

- 具名元组

```ts
const arr: [name: string, age: number, male: boolean] = ['Kylin', 18, true];
```

## type 与 interface

- `type`（Type Alias，类型别名）：将一个函数签名、一组联合类型、一个工具类型等等抽离成一个完整独立的类型。

- `interface` 用来描述**对象、类的结构**
- 但大部分场景下接口结构都可以被类型别名所取代，因此，只要你觉得统一使用类型别名让你觉得更整齐，也没什么问题。

## object、Object 以及 { }

- `object` 的引入就是为了解决对 `Object` 类型的错误使用，它代表**所有非原始类型的类型，即数组、对象与函数类型**

```ts
const tmp17: object = undefined;
const tmp18: object = null;
const tmp19: object = void 0;

const tmp20: object = 'Kylin';  // X 不成立，值为原始类型
const tmp21: object = 599; // X 不成立，值为原始类型

const tmp22: object = { name: 'Kylin' };
const tmp23: object = () => {};
const tmp24: object = [];
```

- `Object`是装箱类型，原型链的顶端是 `Object` 以及 `Function`，这也就意味着所有的原始类型与对象类型最终都指向 `Object`，在 `TypeScript` 中就表现为 `Object` 包含了所有的类型。但不应该使用它

  - `Object` 类似的**装箱类型**还有 `Boolean`、`Number`、`String`、`Symbol`

- `{}`代表**对象字面量**类型，或者叫**内部无属性定义的空对象**，可以表示任何非 `null / undefined` 的值，不应该使用它。

  - 虽然能够将其作为变量的类型，但你实际上**无法对这个变量进行任何赋值操作**：

  ```ts
  const tmp30: {} = { name: 'Kylin' };
  
  tmp30.age = 18; // X 类型“{}”上不存在属性“age”。
  ```

为了更好地区分 `Object`、`object` 以及`{}`这三个具有迷惑性的类型，我们再做下总结：

- 在任何时候都**不要，不要，不要使用** `Object` 以及类似的装箱类型。
- 当你不确定某个变量的具体类型，但能确定它不是原始类型，可以使用 `object`。但我更推荐进一步区分，也就是使用 `Record<string, unknown>` 或 `Record<string, any>` 表示对象，`unknown[]` 或 `any[]` 表示数组，`(...args: any[]) => any`表示函数这样。
- 我们同样要避免使用`{}`。`{}`意味着任何非 `null / undefined` 的值，从这个层面上看，使用它和使用 `any` 一样恶劣。

## 字面量类型

- 它代表着**比原始类型更精确**的类型，同时也是原始类型的子类型
  - 原始类型的值可以包括任意的同类型值，而字面量类型要求的是**值级别的字面量一致**。

```ts
// 字面量类型
const str: "Kylin" = "Kylin";
const num: 599 = 599;
const bool: true = true;

// 报错！不能将类型“"Kylin599"”分配给类型“"Kylin"”。
const str1: "Kylin" = "Kylin599";

const str2: string = "Kylin";
const str3: string = "Kylin599";
```
- 字面量类型主要包括**字符串字面量类型`string`**、**数字字面量类型`number`**、**布尔字面量类型`boolean`**和**对象字面量类型`object`**，它们可以直接作为类型标注

- 通常与联合类型一起使用：`|`
  - 对于联合类型中的函数类型，需要使用括号`()`包裹起来
  - 函数类型并不存在字面量类型，因此这里的 `(() => {})` 就是一个合法的函数类型

```ts
interface Tmp {
  bool: true | false;
  num: 1 | 2 | 3;
  str: "aaa" | "bbb" | "ccc"
}

interface Tmp {
  mixed: true | string | 599 | {} | (() => {}) | (1 | 2)
}
```

- 联合类型的常用场景之一是通过多个对象类型的联合，来实现手动的互斥属性，即这一属性如果有字段1，那就没有字段2：

```ts
interface Tmp {
  user:
    | {
        vip: true;
        expires: string;
      }
    | {
        vip: false;
        promotion: string;
      };
}

declare var tmp: Tmp;

if (tmp.user.vip) {
  console.log(tmp.user.expires);
}

```

## 枚举
- 数字枚举、字符串枚举；普通枚举、常量枚举
- 枚举和对象的重要差异在于，对象是单向映射的，我们只能从键映射到键值。而枚举是双向映射的，即你可以从枚举成员映射到枚举值，也可以从枚举值映射到枚举成员：

```ts
enum Items {
  Foo,
  Bar,
  Baz
}

const fooValue = Items.Foo; // 0
const fooKey = Items[0]; // "Foo"
```

- 仅有值为数字的枚举成员才能够进行这样的双向枚举，字符串枚举成员仍然只会进行单次映射



- 默认情况下是数字枚举，且值为依次递增

```ts
enum Items {
  Foo, // 0
  Bar, // 1
  Baz // 2
}

```
