---
title: Jest 单元测试入门
date: 2017-02-15 08:46:00
tags: [Jest, 单元测试]
---

今天，我们要讲的是 Jest 单元测试的入门知识。

<!--more-->

## 为何要进行单元测试？

在学习 Jest 之前，我们需要回答一个问题：为何要进行单元测试，编写单元测试可以给你带来很多好处：

- 将测试自动化，无需每次都人工测试。
- 变更检查，当代码发生重构，可以及时发现，并做出相应的调整。
- 列举测试用例，可以帮你了解所有的边界情况。
- 当作文档，如果你的测试描述足够详细，生成的测试报告甚至可以当作文档。
- ……

总之，单元测试会让你的生活更加美好。

## 使用 Jest 进行单元测试

编写测试通常都会基于某个测试框架，在众多测试框架中我选择了 Jest，不仅因为我是个 React 开发者（React 与 Jest 都是 Facebook 出的），而且因为它确实简单好用。让我们开始编写测试吧！

首先，安装 Jest：

```sh
npm install --save-dev jest
```

然后，编写一个待测试的文件，以Stack类为例：

Stack.js
```js
function Stack() {
  // 私有变量 items，用于记录数组，对象不能直接操作
  var items = [];
  // 类方法 push，在数组末尾添加项，对象可以直接调用
  this.push = function (element) {
    items.push(element);
  };
  // 删除并返回数组末尾的项
  this.pop = function () {
    return items.pop();
  };
}
```

接下来，编写一个测试文件 Stack.test.js：

Stack.test.js

```js
// 导入 Stack
var Stack = require('./Stack');

test('Stack', function () {
  // 实例化一个 stack 对象
  var stack = new Stack();

  stack.push(8);
  // 期望 stack 最后一项是8
  expect(stack.pop()).toBe(8);
});
```

然后，在 package.json 中添加：

```json
"scripts": {
  "test": "jest"
}
```

最后，打开命令行运行：

```sh
npm test
```

结果会在命令行中生成测试报告：

```sh
PASS  Stack.test.js

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.386s
Ran all test suites.

```

更多的 Jest 用法可以参考它的官网文档：

https://facebook.github.io/jest/
