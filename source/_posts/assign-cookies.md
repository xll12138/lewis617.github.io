---
title: 贪心算法题：分饼干
date: 2017-03-11 11:41:00
tags: [数据结构与算法]
---

今天，我们要讲的是一道贪心算法题：分饼干。这道题也来自 LeetCode：

https://leetcode.com/problems/assign-cookies

本文将先介绍贪心算法的基础知识，然后使用贪心算法解决这个问题，所用的语言依然是 JavaScript。

<!--more-->

## 贪心算法简介

贪心法，又称贪心算法、贪婪算法、或称贪婪法，是一种在**每一步选择中都采取在当前状态下最好或最优（即最有利）的选择**，从而希望导致结果是最好或最优的算法。简单来说，贪心算法的核心思想就是**今朝有酒今朝醉**，**活在当下**。举几个贪心算法的例子吧！

1，一般人换零钱的时候会应用到贪心算法。把$36换散︰$20 > $10 > $5 > $1。先换大面额再换小面额！

![](https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Greedy_algorithm_36_cents.svg/600px-Greedy_algorithm_36_cents.svg.png)

2，但有时候贪心算法并不准确，比如上学时候，学渣使用贪心算法，坚持当下玩乐，但最后却没有好工作，当然前提是他也没有好爸爸。

3，在编程中，贪心算法可以解决一些最优化问题，如：求图中的最小生成树、求哈夫曼编码……对于其他问题，贪心法一般不能得到我们所要求的答案。


## 分饼干

了解了贪心算法，我们来使用它解决“分饼干问题”。“分饼干问题”的题目是这样的：

> 假设你是一个好爸爸（妈妈），你想给你的孩子们分一些饼干。每个孩子只能得到一块饼干，但每个孩子想要的饼干大小不尽相同。你的目标就是尽量让更多的孩子满意。

下面我们再用断言表示一下数据结构和需求。在前面的 ArrayList 类中编写一个新的类方法 `findContentChildren` ，它接受一个表示饼干的数组作为参数，返回能满足的孩子的最大数量。

```js
function createNonSortedArray() {
  var array = new ArrayList();
  array.insert(1);
  array.insert(3);
  array.insert(5);
  array.insert(4);
  array.insert(2);
  return array;
}

// 创建一个数组：[1, 3, 5, 4, 2] 作为每个孩子想要的饼干大小
array = createNonSortedArray();

// 如果饼干为[1, 1]，最多能让1个孩子满足。
expect(array.findContentChildren([1, 1])).toBe(1);
// 如果饼干为[1, 2, 3]，最多能让3个孩子满足。
expect(array.findContentChildren([1, 2, 3])).toBe(3);
```

题目分析完了，让我们使用贪心算法来解决它！贪心算法的核心思想是**坚持当下的最好选择**。那么在这道题中，**当下的最好选择**是什么？答案是，先将“较小的饼干”分给“对饼干尺寸要求最小”、“最好说话”的孩子，因为他们最容易满足，这样才能最大化满足孩子的数量。那么，整个分配流程就应该是这样的：

- 首先，将孩子们按“对饼干尺寸要求最小”排序，将饼干按尺寸大小排序。
- 然后，判断第一块饼干是否能满足第一个孩子，能就分给他，否则就换个稍微大点的，直到满足这个孩子。
- 满足第一个孩子后，再对第二个、第三个以及后面的孩子重复上面一步，直到饼干分完为止。
- 最后统计满足了多少个孩子，并返回结果。

那么用 JavaScript 实现就是：

```js
this.findContentChildren = function (cookies) {
  this.quickSort();
  cookies.sort();
  var i = 0;  // 满足的孩子数量
  for (var j = 0; i < array.length && j < cookies.length; j++) {  // 遍历饼干
    if (array[i] <= cookies[j]) {
      i++;
    }
  }
  return i;
}
```
至此，这道题就做完了！你理解贪心算法了吗？如果不理解，可以再做几道题练习一下：

https://leetcode.com/tag/greedy/

上面的网址是 LeetCode 的所有贪心算法题目，从易到难均有，祝你刷题愉快！

## 教程源代码及目录

https://github.com/lewis617/javascript-datastructures-algorithms

