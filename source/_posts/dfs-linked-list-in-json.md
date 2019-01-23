---

title: 深度优先搜索和链表指针在 JSON 操作中的应用

date: 2019-01-23 16:25:00

tags: [数据结构与算法, LeetCode]

---

最近的工作涉及了大量 JSON 操作，用到了一些之前做过的算法题中的知识，深刻感觉到，传统数据结构与算法在前端开发中的应用也挺多的。所以，想借此文记录总结一番。

<!--more-->

## 深度优先搜索简介

深度优先搜索（Depth-First-Search，DFS）是一种用于遍历或搜索树或者图的算法。顾名思义，它的搜索的规则是深度优先：先访问根结点，如果有孩子节点（或者邻居节点）就优先访问孩子节点，并对孩子节点也进行上述递归访问。

![enter image description here](https://ws1.sinaimg.cn/mw690/83900b4egy1fcvp988h6bj20bu08vmxg)

DFS 可谓是 LeetCode 中考察最多的知识点了，另外由于动态规划算法可以和 DFS 算法相互转换（就像是所有的递归都可以用“栈”来改写一样），所以 DFS 的题目简直不能更多。那么让我们先看下 DFS 算法题吧！

题目：

```
给一个二叉树，找到它的最大深度。最大深度是指根节点到最远的叶子节点的长度。
```

代码：

```python
# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution(object):
    def maxDepth(self, root):
        """
        :type root: TreeNode
        :rtype: int
        """
        def dfs(n, l):
            if not n:
                return l 
            left=dfs(n.left, l+1)
            right=dfs(n.right, l+1)
            return max(left,right)
        return dfs(root, 0)
```

在上述代码中， `dfs` 就是一个使用了深度优先搜索算法的函数。先访问孩子节点（`n.left` 和 `n.right`），然后进行递归。这道题非常简单，不再过多赘述，有兴趣的同学可以去 LeetCode 做一下这道题：

https://leetcode.com/problems/maximum-depth-of-binary-tree/

## 使用深度优先搜索打印 JSON

那么 DFS 在 JSON 操作中有什么用处呢？假如你想在网页上渲染一个 JSON，甚至想渲染出一个表单来编辑这个 JSON，那么就要用到 DFS 了。思路也很简单，先访问一个 JSON 的根结点，然后访问它的所有 key（也就是孩子节点），并对 key 也进行上述递归。

示例代码：

```js
const json = { a: { b: 'hello' }, c: [1, 2] };
const dfs = (n) => {
  console.log(n);
  if(String(n) === '[object Object]' || Array.isArray(n)){
    Object.keys(n).forEach(k => { dfs(n[k]); });
  }
}; 
dfs(json);
```

结果如下：

![kECv8A.png](https://s2.ax1x.com/2019/01/23/kECv8A.png)

可以发现 JSON 中每个节点都被遍历到了。然后你只需要更改 `dfs` 函数的参数，就可以渲染 JSON 树中的任意一项了，也可以渲染表单项来编辑它们。

## 链表指针简介

**链表**（Linked list）是一种常见的基础数据结构，是一种[线性表](https://zh.wikipedia.org/wiki/%E7%BA%BF%E6%80%A7%E8%A1%A8 "线性表")，但是并不会按线性的顺序存储数据，而是在每一个节点里存到下一个节点的[指针](https://zh.wikipedia.org/wiki/%E6%8C%87%E6%A8%99_(%E9%9B%BB%E8%85%A6%E7%A7%91%E5%AD%B8) "指针 (计算机科学)")(Pointer)。

链表遍历及操作也是 LeetCode 考察非常多的题目，我们来看一道简单的吧！

题目：

```
反转一个单链表。

例子：

Input: 1->2->3->4->5->NULL
Output: 5->4->3->2->1->NULL
```

代码：

```python
# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution(object):
    def reverseList(self, head):
        """
        :type head: ListNode
        :rtype: ListNode
        """
        p1,p2=None,head
        while p2:
            p2.next,p1,p2=p1,p2,p2.next
        return p1
```

上述代码中，`p1`、`p2` 就是指针。两个指针都遍历了链表，但`p2` 比 `p1` 快一步，并在每一步把 `next` 指向 `p1`。最后，`p1` 就是原链表的反转版本。

题目地址：

https://leetcode.com/problems/reverse-linked-list/ 

## 使用链表指针获取 JSON 中的叶子节点的值

那么链表指针在 JSON 操作中有什么用呢？我们可以把 JS 中 Object 的 key 当作链表中的 `next`。那么如果知道一个叶子节点的路径，我们就可以用指针像遍历链表那样遍历到 JSON 的叶子节点处。比如：

```js
const json = { a: { b: 'hello' }, c: [1, 2] };
const path = ['a', 'b'];
let point = json;
path.forEach(key => { point = point[key] });
// point 为 'hello'，即 json.a.b 的值。
console.log(point);
```

上述代码中，`json` 是我们要查找的 JSON 对象，`path` 是叶子节点的路径，`point` 是指针，通过遍历，`point` 最后指向了指定的叶子节点的值。

## 结语

本文讲述的算法都非常简单，在 LeetCode 上应该属于 Easy 中的 Easy 级别的，但是将算法应用到实际工作中也是一件有趣的事情，故记录下来，作为总结，也抛砖引玉，分享给大家。