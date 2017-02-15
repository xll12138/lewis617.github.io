---
title:  JavaScript 版数据结构与算法（一）栈
date:  2017-2-15 10:46:00
tags: [数据结构与算法]
---

今天，我们要讲的是数据结构与算法中的栈。

<!--more-->

## 栈的简介

栈是什么？栈是一个后进先出（LIFO）的数据结构。栈有啥作用？栈可以模拟科学计算或生活中的一些后进先出的场景，比如：

- 十进制转二进制，你需要将余数倒序输出。
- 在二叉树非递归先序遍历中，栈还可以先后压入当前节点的右节点和左节点，然后倒序遍历它们，从而实现当前节点到左节点到右节点的先序顺序。 
- 在生活中，栈可以模拟煤炉与蜂窝煤等。

![](https://ws1.sinaimg.cn/large/83900b4ely1fcqywbcbrjj20hz08dq2s)


## 用 JavaScript 写一个栈类

对于 JavaScript 工程师来说，没必要在开发中实现一个栈。因为 JavaScript 的内置对象 Array 已经实现了栈的相关方法。不过，好的程序员不能光用别人设计好的方法，而不理解为啥这么设计，所以我们还是自己设计一个栈玩玩吧！

我们把栈写成一个类，你可以使用 ES6 的 class 关键字来实现类，不过我建议你使用传统的构造器函数来模拟类，因为这样可以给人一种你是个 JavaScript 老手的错觉，哈哈！

什么是构造器函数？构造器函数是编写对象的方法之一。一般情况下，你可以这样编写一个对象：

```js
var obj = { a:1, b:2 };
```
 
但也可以使用构造器函数来编写对象：
```js
 function Obj(a, b){
   this.a = a;
   this.b = b;
 }
 var obj = new Obj(1, 2); //obj 等价于 { a:1, b:2 }
```
使用构造器函数的好处在于可以传递参数。构造器函数通常首字母大写，而且需要使用 new 关键词来调用。在 JavaScript 中是没有类的，利用构造器函数我们可以模拟一个类。

下面就是栈的实现代码：

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
  // 查看数组最后一项
  this.peek = function () {
    return items[items.length - 1];
  };
  // 判断数组是否为空
  this.isEmpty = function () {
    return items.length == 0;
  };
  // 清空数组
  this.clear = function () {
    items = [];
  };
  // 返回数组长度
  this.size = function () {
    return items.length;
  };
  // 将数组转为字符串并返回
  this.toString = function () {
    return items.toString();
  };
}
```

上述栈类中，有个私有变量 `items` ，为何它就不能直接操作呢？为何挂在 this 上的方法可以直接调用？因为 **new 操作符会将构造器函数中的 this 指向生成的对象**，也就是说挂在 this 上的方法或属性将来会成为生成对象的方法或属性，所以可以直接调用。而 **`items` 则是函数内部的一个局部变量，它在函数外部是不可见的**，生成对象只能通过调用自身的方法，沿着作用域链来操作 `items`。

```js
var stack = new Stack();

// stack 对象不能直接操作items，结果是 undefined
console.log(stack.items) 
 
// stack 对象可以直接操作构造器函数中挂在 this 上的属性和方法
console.log(stack.peek())
```

如果你不熟悉 JavaScript ，那么你应该先学习一下 JavaScript 作用域、this 和 new 操作符的相关知识。推荐阅读参考 Stoyan Stefanow 的《JavaScript 面向对象编程指南》，这本书里面有很多小的代码片段以及相关的图文解读，可以帮助你更好地理解 JavaScript 的相关特性。

## 编写测试

写好了栈，我们来测试它。你可以直接调用这个栈类，并通过 console.log 等方法来查看测试，但这并不高效，我建议你通过编写单元测试的方法来测试这个栈，编写单元测试可以给你带来很多好处：

- 将测试自动化，无需每次都人工测试。
- 变更检查，当代码发生重构，可以及时发现，并做出相应的调整。
- 列举测试用例，可以帮你了解所有的边界情况。
- 当作文档，如果你的测试描述足够详细，生成的测试报告甚至可以当作文档。
- ……

编写测试通常都会基于某个测试框架，在众多测试框架中我选择了 Jest，不仅因为我是个 React 开发者（React 与 Jest 都是 Facebook 出的），而且因为它确实简单好用。让我们开始编写测试吧！

首先，安装 Jest：

```sh
npm install --save-dev jest
```

然后，在 Stack.js 中导出编写的 Stack 类：

Stack.js
```js
...

module.exports = Stack;
```

接下来，编写一个测试文件 Stack.test.js：

Stack.test.js

```js
// 导入 Stack
var Stack = require('./Stack');

test('Stack', function () {
  // 实例化一个 stack 对象
  var stack = new Stack();

  // 期望 stack 为空
  expect(stack.isEmpty()).toBeTruthy();

  stack.push(5);
  stack.push(8);
  // 期望 stack 最后一项是8
  expect(stack.peek()).toBe(8);
  // 期望 stack 的长度为2
  expect(stack.size()).toBe(2);
  // 期望 stack 不为空
  expect(stack.isEmpty()).toBeFalsy();

  stack.pop();
  // 期望 stack 长度为1
  expect(stack.size()).toBe(1);
  // 期望 stack 转化成的字符串为'5'
  expect(stack.toString()).toBe('5');
  stack.clear();
  // 期望 stack 长度为0
  expect(stack.size()).toBe(0);
});
```

在实际开发中，应该用 describe、test 和 it 等方法打包编写所有的测试用例，但是在这里我偷懒将其写在一个 test 中。

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

或以 watch 模式运行：

```sh
npm test -- --watch
```

结果会在命令行中生成测试报告：

```sh
PASS  Stack/Stack.test.js

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.386s
Ran all test suites.

```
更多的 Jest 用法可以参考它的官网文档：

https://facebook.github.io/jest/


## 总结

今天就到此为止吧！这节课我们不仅讲了栈，还了解了 JavaScript 面向对象编程和单元测试的相关知识。这篇文章并不能涵盖上述知识的全部，你需要根据文中的提示去阅读其他的相关资料来更深入地学习它们。

## 教程源代码及目录

https://github.com/lewis617/javascript-datastructures-algorithms





