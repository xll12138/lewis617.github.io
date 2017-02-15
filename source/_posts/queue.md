---
title: JavaScript 版数据结构与算法（二）队列
date: 2017-02-15 13:53:00
tags: [数据结构与算法]
---

今天，我们要讲的数据结构与算法中的队列。

<!--more-->

## 队列简介

队列是什么？队列是一种先进先出（FIFO）的数据结构。队列有什么用呢？队列通常用来描述算法或生活中的一些先进先出的场景，比如：

- 在图的广度优先遍历中，我们需要使用队列来记录每个节点的相邻节点，以便可以在接下来最先访问它们，从而实现广度优先遍历。
- 在 JavaScript 事件循环（Event Loop）中有一个事件队列（Task Queue），也是先进先出来处理各种异步事件。
- 在生活中，队列可以映射排队打饭等先来后到的场景。

![](https://ws1.sinaimg.cn/large/83900b4ely1fcr48hfps7j20c40drglj)

## 用 JavaScript 编写队列类

和[《JavaScript 版数据结构与算法（一）栈》](https://lewis617.github.io/2017/02/15/stack/)中编写栈类的方法类似，编写队列类也使用了构造器函数。

Queue.js

```js
function Queue() {
  // 私有变量 items，用于记录数组
  var items = [];
  // 入队
  this.enqueue = function (element) {
    items.push(element);
  };
  // 出队
  this.dequeue = function () {
    return items.shift();
  };
  // 查看队列的第一个元素
  this.front = function () {
    return items[0];
  };
  // 查看队列是否为空
  this.isEmpty = function () {
    return items.length == 0;
  };
  // 查看队列的长度
  this.size = function () {
    return items.length;
  };
  // 将数组转为字符串并返回
  this.toString = function () {
    return items.toString();
  };
}

// 导出队列类
module.exports = Queue;
```

上述类方法都比较简单，但是请注意数组增删的四个方法，别搞混淆了：

- push：在尾部添加新元素
- pop：删除并返回尾部元素
- unshift：在头部添加新元素
- shift：删除并返回头部元素

所以，出队的方法用的是shift。

## 测试队列类

测试代码如下，比较简单，不再详述。

```js
var queue = new Queue();
expect(queue.isEmpty()).toBeTruthy();
queue.enqueue('John');
queue.enqueue('Jack');
queue.enqueue('Susan');
expect(queue.front()).toBe('John');
expect(queue.toString()).toBe('John,Jack,Susan');
expect(queue.size()).toBe(3);
expect(queue.isEmpty()).toBeFalsy();
queue.dequeue();
queue.dequeue();
expect(queue.toString()).toBe('Susan');
```

## 教程源代码及目录

https://github.com/lewis617/javascript-datastructures-algorithms