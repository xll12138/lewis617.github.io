---
title: JavaScript 版数据结构与算法（三）链表
date: 2017-02-15 18:35:00
tags: [数据结构与算法]
---

今天，我们要讲的是数据结构与算法中的链表。

<!--more-->

## 链表简介

链表是什么？链表是一种动态的数据结构，这意味着我们可以任意增删元素，它会按需扩容。为何要使用链表？因为数组的存储有缺陷：增删元素时往往需要移动元素。而链表在内存中的放置并不是连续的，元素通过 next 属性指向下个元素，所以链表增删元素，不需要移动元素，只需要更改 next 的指向即可。在生活中，最形象的链表莫过于火车了，车头是 head，每一节车厢都有一个 next 用于连接后面的车厢，想增删车厢，只需要更改 next 即可。另外，在使用分离链接法解决散列表冲突时，我们也会用链表存储位置冲突的元素。

![](https://ws1.sinaimg.cn/large/83900b4egy1fcrboyt21qj20ic041q2q)

## 使用 JavaScript 编写链表类

与前面两节课相同，编写链表类，我们仍然使用构造器函数的方法。

```js
function LinkedList() {
  ...
}

module.exports = LinkedList;
```

### 私有变量

与栈和队列不同，链表类的私有变量不是一个数组，而是一个指针 `head`。这个指针其实就是指向某个对象的普通变量而已。除此之外，我们还要定义私有变量 `length` 来记录链表的长度，私有构造器函数 `Node` 来构建包含 next 属性的链表元素。

```js
function LinkedList() {
  var Node = function (element) {
    this.element = element;
    this.next = null;
  };

  var length = 0;
  var head = null;
}

```

### 实现 append 和 toString 方法

我们期望链表类拥有 append 和 toString 方法，可以完成下面的测试：

```js
var linkedList = new LinkedList();
linkedList.append(15);
linkedList.append(10);
expect(linkedList.toString()).toBe('15,10');
```

> 单元测试有时候就是可以作为需求文档来用的，在测试驱动开发（TDD），往往都是先写测试，再写代码。

我们编写的代码如下：

```js
this.append = function (element) {
  var node = new Node(element),
    current;
  
  // 链表为空直接将 head 指向新元素，对应第一个 append
  if (head === null) {
    head = node;
  } else {
    // 链表不为空需要将 current 移动到最后一个元素，对应第二个 append
    current = head;
    while (current.next) {
      current = current.next;
    }
    // 然后将最后一个元素的 next 属性指向新元素
    current.next = node;
  }
  length++;
};

...

this.toString = function () {

  var current = head,
    string = '';

  while (current) {
    string += current.element + (current.next ? ',' : '');
    current = current.next;
  }
  return string;

};
```

上述两个方法都遍历了链表：

```js
while (current) {
  // 此处编写循环中的逻辑
  ...
  current = current.next;
}
```

### 实现 removeAt 方法

实现 `removeAt` 方法，跑通如下测试：

```js
var linkedList = new LinkedList();
expect(linkedList.removeAt(1)).toBe(null);
linkedList.append(15);
linkedList.append(10);
expect(linkedList.removeAt(-1)).toBe(null);
expect(linkedList.removeAt(3)).toBe(null);
expect(linkedList.removeAt(1)).toBe(10);
expect(linkedList.removeAt(0)).toBe(15);
expect(linkedList.toString()).toBe('');
```

前三个断言都是异常情况，应该使用条件语句来判断并跳过，第四个和第五个断言是正常情况，应该删除元素并返回。实现代码如下：

```js
this.removeAt = function (position) {
  // 异常判断，用于跳过前三个断言
  if (head !== null && position > -1 && position < length) {
    var current = head,
      previous,
      index = 0;
    // 删除头部元素，对应第五个断言
    if (position === 0) {
      head = current.next;
    } else {
      // 找出指定位置元素，并让它的前一个元素连接它的后一个元素，对应第四个断言
      while (index < position) {
        previous = current;
        current = current.next;
        index++;
      }
      previous.next = current.next;
    }

    length--;
    return current.element;

  }
  return null;
};
```

这个方法的技巧是找出指定位置元素，但本质还是遍历链表，只是终止时间有差别而已：

```js
while (index < position) {
  // 代码逻辑
  ...
  current = current.next;
  index++;
}
```

### 实现 insert 方法

实现 `insert` 方法，跑通如下测试：

```js
var linkedList = new LinkedList();
expect(linkedList.insert(0, 15));
expect(linkedList.insert(1, 12));
expect(linkedList.insert(0, 10));
expect(linkedList.insert(-1, 8));
expect(linkedList.insert(4, 8));
expect(linkedList.toString()).toBe('10,15,12');
```

第一个和第三个断言是往头部插入，第二个是往非头部插入，第四个和第五个都是异常非法输入。实现代码如下：

```js
this.insert = function (position, element) {
  // 用于跳过非法输入，对应第四个和第五个断言
  if (position > -1 && position <= length) {
    var node = new Node(element),
      current = head,
      previous,
      index = 0;
    // 往头部插入，对应第一个和第三个断言
    if (position === 0) {
      node.next = current;
      head = node;
    } else {
      // 往非头部插入，对应第二个断言
      while (index < position) {
        previous = current;
        current = current.next;
        index++;
      }
      node.next = current;
      previous.next = node;
    }

    length++;

    return true;
  }
  return false;
};
```

这个方法的技巧也是在链表中查找指定元素，其他都是无聊的边界判断。

### 实现 indexOf 方法

实现 `indexOf` 方法，跑通如下测试。

```js
var linkedList = new LinkedList();
linkedList.append(15);
linkedList.append(10);
expect(linkedList.indexOf(12)).toBe(2);
expect(linkedList.indexOf(8)).toBe(-1);
```

第一个断言是正常情况，返回 `position`，第二个没有该元素返回 `-1` 。技巧还是在链表中遍历查找元素。

```js
this.indexOf = function (element) {
  var current = head,
    index = 0;

  while (current) {
    if (element === current.element) {
      return index;
    }
    index++;
    current = current.next;
  }
  return -1;
};
```

其他方法比较简单不再赘述。

## 总结

玩转链表，有以下技巧：

- 确定私有变量和元素结构，主要包括一个 head 指针，一个构造器函数 Node，用于生成包含 next 属性的对象。
- 掌握遍历链表的方法，即使用 while 循环，通过 `current = curren.next`来遍历。
- 学习在遍历链表时使用 `previous` 来记录当前节点的上一个节点。
- 考虑各种边界情况：空链表、在查找范围外等情况。

除了掌握上述技巧，动手写代码也是很重要的！今天，就到此为止。

## 教程源代码及目录

https://github.com/lewis617/javascript-datastructures-algorithms