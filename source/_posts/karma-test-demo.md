---
title: 使用karma测试平时写的小demo（arguments为例）
date: 2015-12-09 01:51:00
tags: [Karma, 测试]
---

有人说前端自动化测试非常困难，我觉得确实如此。在项目中，我个人也不放心写的测试，还是要手动测试。但是我们平时写demo学习时，完全可以使用自动化测试。

## 传统demo

1，新建一个html

2，写入js脚本

3，运行html

平时写demo，大家伙恐怕都是这个步骤吧，其实我们可以使用karma自动化这个过程。

## 自动化demo（使用karma）

假设已经安装好karma，如果不会，请看本人的这篇博客 [karma单元测试入门](http://www.cnblogs.com/lewis617/p/4872996.html)

1，在根目录运行

```
karma init
```

一路空格选择默认，在What is the location of your source and test files ?这一项输入 *.js，其他默认

![](https://ws3.sinaimg.cn/large/83900b4egw1f9yh3r64jdj20j00io42x.jpg)

2，在根目录新建js文件demo.js

如网友某个例子：

```
function f(a, b, c){
    alert(arguments.length); // result: "2"
    a = 100;
    alert(arguments[0]);       // result: "100"
    arguments[0] = "qqyumidi";
    alert(a); // result: "qqyumidi"
    alert(c);                  // result: "undefined"
    c = 2012;
    alert(arguments[2]);       // result: "undefined"
}

f(1, 2);
```

3，运行

```
karma start
```

在命令行就可以看见运行结果啦：

![](https://ws1.sinaimg.cn/large/83900b4egw1f9yh3w7y18j20rr095mzd.jpg)

## 觉得麻烦？

这是我在教学，所以写的比较罗嗦，我自己在测试时候各种快捷！

## jasmine的语法你怎么不用？

那些describe的语法当然可以用，这个例子只是为了教学，所以尽量避免干扰因素。