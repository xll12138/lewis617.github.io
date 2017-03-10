---
title: 动态规划算法题：打家劫舍
date: 2017-03-10 16:45:00
tags: [数据结构与算法]
---

今天，我们要讲的是一道动态规划算法题：打家劫舍。这道题有两个版本，后面一种版本与前面版本相比稍微复杂一些，它们都来自 LeetCode：

https://leetcode.com/problems/house-robber

https://leetcode.com/problems/house-robber-ii

本文将先介绍动态规划的基础知识，然后使用动态规划思想解决这个问题，所用的语言仍然是 JavaScript。

<!--more-->

## 动态规划简介

动态规划是(Dynamic Programming，DP)是一种将复杂问题分解成更小的子问题来解决的优化技术。那么具体哪些算法用到了动态规划呢？使用动态规划的算法很多，先列举一些简单的吧！比如：

1，求斐波那契数列：

```js
function fibonacci(num) {
  if (num === 1 || num === 2) {
    return 1;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
}
```

上述函数将 `fibonacci(num)` 分解成 `fibonacci(num - 1)` 和 `fibonacci(num - 2)`，然后继续分解直到 `num` 为1或2时终止。

2，深度优先遍历（DFS）：

   - 先访问一个顶点，然后对相邻顶点挨个进行深度优先遍历。

上述做法将复杂的图遍历分解为“每个顶点的**访问**与**相邻顶点的深度优先遍历**”。有点类似于二叉树先序遍历。具体代码请参考前面的博文[《 JavaScript 版数据结构与算法（八）图 》](https://lewis617.github.io/2017/02/19/graph/)。

## 动态规划和分而治之的区别

了解了动态规划，我们来看另一种思想——分而治之。分而治之方法与软件设计的模块化方法非常相似。为了解决一个大的问题，可以： 

1. 把它分成两个或多个更小的问题； 
2. 分别解决每个小问题； 
3. 把各小问题的解答组合起来，即可得到原问题的解答。

小问题通常与原问题相似，可以递归地使用分而治之策略来解决。

动态规划和分而治之都是**大问题分解成多个子问题**，那么这两者有什么区别呢？动态规划和分而治之的区别在于**子问题之间是否独立**。分而治之是把问题分解成相互独立的子问题，然后组合它们的答案，而动态规划则把问题分解成相互依赖的子问题。

常见的使用分而治之的算法有**归并排序**和**快速排序**。具体实现代码可以参考前面的博文[《JavaScript 版数据结构与算法（九）排序和搜索》](https://lewis617.github.io/2017/02/20/sort-and-search/)。

## 用动态规划解决“打家劫舍问题”

通过前面的介绍，大家应该对动态规划有个大致的了解了，下面让我们用动态规划来解决“打家劫舍问题”。“打家劫舍问题”的题目是：

> 假设你是一个专业的劫匪，你计划去打劫一条街上的家舍。每家有一定数量的钱财，但相邻两家有一个彼此连接的安全系统。一旦相邻两家在同一晚被打劫，那么这个安全系统就会自动报警。

> 给你一个由非负整数组成的数组，用来代表每家的钱财，在不让安全系统自动报警的前提下，求你能打劫到的钱财的最大数量。

我们还是用单元测试来表达一下需求吧！毕竟好多程序员看机器语言要比自然语言还舒服：

```js
function createRobArray() {
  var array = new ArrayList();
  array.insert(2);
  array.insert(0);
  array.insert(0);
  array.insert(4);
  array.insert(5);
  return array;
}

// 创建一个数组为：[2, 0, 0, 4, 5]
array = createRobArray();

// 那么能打劫到的最大钱财是7
expect(array.simpleRob()).toBe(7);
```

我们还是将新的类方法 `simpleRob`写到了前面的 [ArrayList 类](https://github.com/lewis617/javascript-datastructures-algorithms/tree/master/ArrayList) 中。该方法会返回内部数组的最大的不相邻数字之和。

那么如何实现这个算法呢？我们需要借助动态规划思想：

- 如果数组长度为1，那么直接返回数组唯一项。
- 如果数组长度为2，那么返回“第1项”和“第2项”的较大者。
- 如果数组长度为3，那么返回“数组长度为1的结果+第3项”与“数组长度为2的结果”的较大者。
- 如果数组长度为4，那么返回“数组长度为2的结果+第4项”与“数组长度为3的结果”的较大者。
- ……
- 如果数组长度为n，那么返回“数组长度为n-2的结果+第n项”与“数组长度为n-1的结果”的较大者。

为何会如此呢？因为题目要求不能打劫相邻两家，所以数组的当前项只能和上上次的结果相加。那么子问题就是“数组长度为n-2的结果+第n项”与“数组长度为n-1的结果”。用方程来表示就是：

```
f(0) = array[0]
f(1) = max(array[0], array[1])
f(n) = max( f(n-2) + array[n], f(n-1) )
```

所以实现代码就是：

```js
var rob = function (array) {
  var last = 0,
    now = 0;
  for (var i = 0; i < array.length; i++) {
    var temp = last;
    last = now;
    now = Math.max(temp + array[i], now);
  }

  return now;
};

this.simpleRob = function () {
  return rob(array);
};
```
## 圆圈版打家劫舍

“打家劫舍”问题还有另一个版本，它的题目是：

> 在上次打劫后，作为专业劫匪的你意识到自己需要去一个新的地方打劫，这样才不会引起太多注意。这次，你去的地方的家舍是按圆圈形状来排列的。这意味着第一家和最后一家是挨着的，同时，安全系统和上个地方的一样。

> 给你一个由非负整数组成的数组，用来代表每家的钱财，在不让安全系统自动报警的前提下，求你能打劫到的钱财的最大数量。

那么这道题该如何解答呢？因为家舍首尾相连，所以你不能在同一晚打劫第一家和最后一家，既然不能打劫，机智的你索性将计就计，先排除最后一家不管，或者先排除第一家不管，打劫剩余的家舍，然后比较那个更划算。所以这道题可以这么来解答：

- 先求出第一家到倒数第二家的最大钱财数量
- 然后求出第二家到最后一家的最大钱财数量
- 最后求两者的较大值

所以实现代码就是：

```js
this.circleRob = function () {
  if (array.length === 1) {
    return array[0];
  }
  return Math.max(rob(array.slice(1)), rob(array.slice(0, array.length - 1)));
}
```
上述代码中，`array.slice(1)`代表排除了第一家，`array.slice(0, array.length - 1)`代表排除了最后一家。然后运行测试，发现确实没有上次打劫的多：

```js
function createRobArray() {
  var array = new ArrayList();
  array.insert(2);
  array.insert(0);
  array.insert(0);
  array.insert(4);
  array.insert(5);
  return array;
}

array = createRobArray();
expect(array.simpleRob()).toBe(7);
expect(array.circleRob()).toBe(6);
```
至此，“打家劫舍问题”就讲完了！其实，“打家劫舍问题”的本质在于使用“动态规划”，而“动态规划”的本质在于将大问题分解为相互依赖的子问题。看清问题本质，才能练好算法！加油吧！

 
## 教程源代码及目录

https://github.com/lewis617/javascript-datastructures-algorithms



