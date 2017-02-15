---
title:  JavaScript 版数据结构与算法（一）栈
date:  2017-02-15 10:46:00
tags: [数据结构与算法]
---

今天，我们要讲的是数据结构与算法中的栈。

<!--more-->

## 栈的简介

栈是什么？栈是一个后进先出（LIFO）的数据结构。栈有啥作用？栈可以模拟算法或生活中的一些后进先出的场景，比如：

- 十进制转二进制，你需要将余数倒序输出。
- 在二叉树非递归先序遍历中，先打印当前节点，然后向栈中先后压入当前节点的右节点和左节点，接着出栈打印循环往复，从而实现当前节点到左节点到右节点的先序顺序。 
- 在二叉树非递归中序遍历中，栈可以先后压入当前节点和左节点，直到左节点尽头开始出栈打印，打印一个就移到它的右节点上重复上述过程，如果没有右节点，就再出栈打印，循环往复来实现中序遍历。
- 在二叉树非递归后续遍历中，可以创建两个栈，一个栈模拟先序遍历中的“印右左“，不过把“印“这一步改为向另一个栈压入元素，最后倒序打印即可。
- 在生活中，栈可以模拟煤炉与蜂窝煤等场景。

![](https://ws1.sinaimg.cn/large/83900b4ely1fcqywbcbrjj20hz08dq2s)


## 用 JavaScript 写一个栈类

对于 JavaScript 工程师来说，没必要在开发中实现一个栈。因为 JavaScript 的内置对象 Array 已经实现了栈的相关方法。不过，好的程序员不能光用别人设计好的方法，而不理解为啥这么设计，所以我们还是自己设计一个栈玩玩吧！

我们使用构造器函数来模拟类，不了解构造器函数的同学可以看[《在 JavaScript 中使用构造器函数模拟类》](https://lewis617.github.io/2017/02/15/construcor-function-create-class/)这篇博客。

```js
function Stack(){
  ...
}

module.exports = Stack;
```

### 私有变量

栈类的私有变量是个数组 `items`，用于记录栈的元素。栈类实例化生成的对象不能直接操作 `items`，因为 `items` 在函数外面是不可见的，你只能通过一些类方法沿着作用域链来间接操作 `items`。

```
function Stack() {
  // 私有变量 items，用于记录数组，对象不能直接操作
  var items = [];
}
```

### 实现 push 、pop和 toString 方法

实现 `push` 、`pop` 和 `toString` 方法，跑通如下测试：

```js
// 实例化一个 stack 对象
var stack = new Stack();
stack.push(5);
stack.push(8);

// 期望 stack 转化成的字符串为'5,8'
expect(stack.toString()).toBe('5,8');

// 期望 stack 删除并返回的是8
expect(stack.pop()).toBe(8);
// 期望 stack 转化成的字符串为'5'
expect(stack.toString()).toBe('5');
```

> 本教程用了 Jest 来进行单元测试，如果你不了解 Jest 和单元测试，可以先看[《Jest 单元测试入门》](https://lewis617.github.io/2017/02/15/start-jest/)这篇博客。


 `push` 、`pop` 和 `toString` 方法 与 Array 自带的  `push` 、`pop` 和 `toString`  方法一样，所以实现代码如下：

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
  
  // 将数组转为字符串并返回
  this.toString = function () {
    return items.toString();
  };
}

```

### 实现 peek 、isEmpty、clear、size 方法

实现 `peek` 、`isEmpty`、`clear`、`size` 方法，跑通如下测试：

```js
// 实例化一个 stack 对象
var stack = new Stack();
stack.push(5);
stack.push(8);

// 期望 stack 最后一项是8
expect(stack.peek()).toBe(8);
// 期望 stack 的长度为2
expect(stack.size()).toBe(2);
// 期望 stack 不为空
expect(stack.isEmpty()).toBeFalsy();

stack.clear();
// 期望 stack 长度为0
expect(stack.size()).toBe(0);
```

上述方法比较简单，直接上代码：

```js
function Stack() {
  // 私有变量 items，用于记录数组，对象不能直接操作
  var items = [];
  
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
}
```

至此，栈的编写就完成了。

## 教程源代码及目录

https://github.com/lewis617/javascript-datastructures-algorithms





