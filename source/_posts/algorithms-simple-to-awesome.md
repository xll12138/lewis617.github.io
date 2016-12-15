---
title: 算法技巧：从粗暴到优雅
date: 2016-12-15 12:20:00
tags: [算法, JavaScript]
---

在前端圈有个鄙视链，那就是：学框架不如学语言（原型链、作用域链），学语言不如学算法。鄙视链存在即合理，为了不被鄙视，我最近闲了就会经常打开Chrome的控制台，写几个算法玩玩。现将一些写算法的技巧总结如下。

<!--more-->

## 告别死记硬背

在看一些别人写好的现成算法代码时，我们通常会觉得非常简单，比如：

十进制转为二进制：

```js
function baseConverter(decNumber){
  var remStack = new Array(),
      rem,
      baseString = ''
      
  while(decNumber > 0){
    rem = Math.floor(decNumber % 2);
    remStack.push(rem)
    decNumber = Math.floor(decNumber / 2);
  }
  
  while(remStack.length > 0){
    baseString += remStack.pop();
  }
  
  return baseString;
}
```

二叉树正序遍历：

```js
var preOrder = function(node){
  if(node){
    console.log(node.value);
    preOrder(node.left);
    preOrder(node.right);
  }
}
```

可是，如果让你自己手写，恐怕就没有那么简单了。或许，你可以背下来，但是算法千变万化，你背得完吗？想要告别死记硬背，就得总结算法技巧。本文要讲的技巧是——从粗暴到优雅。

## 算法并非一气呵成

从粗暴到优雅，指的是，你可以先用最简单粗暴的（伪）代码将算法思路写下来，然后整理成优雅的思路，最后生成代码。让我们用上述两个例子来演示这个技巧。

十进制转为二进制：

首先，想最粗暴的思路，粗暴的思路通常可以通过假设几个case来产生：

- 0 => 0：0除以2得0余0，将余数倒序拼接：0
- 1 => 1：1除以2得0余1，将余数倒序拼接：1
- 4 => 100 ：4除以2得2余0，2除以2得1余0，1除以2得0余1，将余数倒序拼接：100。


整理优雅的思路：

- 将十进制数字和整数N（进制）进行整除，将结果和余数记录下来
- 对结果再次进行整除，将新结果和余数记录下
- 循环第二步，直到结果为零
- 将余数倒序拼接，得到结果

然后，写优雅的代码。

```js
function baseConverter(decNumber, base){
  var remStack = new Array(),
      rem,
      baseString = ''
      
  while(decNumber > 0){
    rem = Math.floor(decNumber % 2);
    remStack.push(rem)
    decNumber = Math.floor(decNumber / 2);
  }
  
  while(remStack.length > 0){
    baseString += remStack.pop();
  }
  
  return baseString; 
}
```

二叉树正序遍历：

首先，假设几个case来生成粗暴的思路：

```
空 => 什么也不打印 
```

```
1 => 1 
只有一个节点1，打印节点1
```
```
1
23 => 123 
打印节点1，然后打印节点1的左节点2，然后打印节点1的右节点3
```

```
1
2  3    
45 67 => 1245367 
打印节点1，然后节点1的左节点2，然后打印节点2的左节点4，节点4没有左右节点，所以打印节点2的右节点5，节点5没有左右节点，所以打印节点1的右节点3，然后打印节点3左节点6，然后打印节点3的右节点7
```

优雅思路：

- 如果节点存在，打印节点
- 如果左节点存在，打印左节点
- 如果左节点有子（左右）节点则先打印子节点，然后如果右节点存在打印右节点
- 子节点开始循环123步

整理成代码：

```js
// 第4步
var preOrder = function (node){
  // 第1步
  if(node){
    console.log(node.value);
    // 第2步
    if(node.left){
      console.log(node.left.value)
      // 第3步
	  if(node.left.left){
	    console.log(node.left.left.value)
	  }
	  ...
    }
    if(node.right){
      console.log(node.right.value)
    }
  ...
  }
}

// 将循环的部分提取出来进行递归
var preOrder = function (node){
  if(node){
    console.log(node.value)
    preOrder(node.left)
    preOrder(node.right)
  }
}
```

这就是从粗暴到优雅的简单演示，非常熟练的程序员是不需要这么繁琐的，毕竟算法越练越熟悉，模块化的东西越多，解题跳跃度越高。但是，这是解算法的常规思路，祝你有一天可以将从粗暴到优雅这个过程封装进自己的脑海中，直接写出优雅的算法。