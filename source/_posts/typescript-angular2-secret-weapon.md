---
title: "TypeScript: Angular 2 的秘密武器（译）"
date: 2016-12-24 03:24:00
tags: [TypeScript, Angular2]
---

本文整理自Dan Wahlin在ng-conf上的talk。原视频地址：

https://www.youtube.com/watch?v=e3djIqAGqZo

<!--more-->

## 开场白

开场白主要分为三部分：

- 感谢了ng-conf的组织者。
- 阐述了TypeScript是JavaScript的超集，并不是另外一种语言。
- 引用了他的两个朋友最喜欢的TypeScript特性。

由于开场白内容不太重要，所以不再赘述。下面开始讲解Dan Wahlin最喜欢的TypeScript的特性。

## 类型支持（Type Support）

让我们来聊下类型支持吧！先打开TypeScript Playground（https://www.typescriptlang.org/play/），我们会看到一个非常简单的例子。

![](https://ws3.sinaimg.cn/large/83900b4ejw1fb1xoydep9j21im0w4ahe.jpg)


左边是TypeScript，右边是编译后的JavaScript，它俩差异很大吗？并不是，呵呵！不过用来讲解类型支持还是不错的。我们给x和y各添加一个number类型，然后发现报错了：不能给number类型的参数指定string类型。

![](https://ws4.sinaimg.cn/mw690/83900b4ejw1fb1xzk7g7kj20dw086dgl.jpg)

这太基础了！不过，事实上我们可以通过类型支持做更多的事情！你可以使用主要的几种类型：string、number、boolean、Array，还可以使用any表示任何类型。不过，真正很酷的是，你可以自定义类型。我们来看几个例子：

![](https://ws3.sinaimg.cn/mw690/83900b4ejw1fb1y47uqhjj20qw0l876n.jpg)

上述例子中，name是string类型，age是number类型，isEnabled是boolean类型，不过注意accessories，这是联合类型（Union Type），你可以给它传递string类型，也可以给它传递每项为string的数组，在一些特别的场景下，比如：如果你编写了一个可重用的组件，并想非常灵活地使用它！这时候你可能会使用联合类型。最下面那个是自定义类型，我非常喜欢它！它在Angular 2框架中被重度使用！不过，我们等会再讲解它。

那么为何要使用类型？我将在Playground中演示一个例子，比如在写ng2组件时，你想通过add方法更新total，你将会知道正确的方法是什么（指的就是参数类型均为number）。

![](https://ws2.sinaimg.cn/mw690/83900b4ejw1fb1yvbhn8zj20dw09e752.jpg)

很明显，这是个非常简单的例子。让我们来聊点更有用的特性！

## 工具支持（Tooling Support）

TypeScript中有个很酷的特性就是工具支持，因为我们可以以此明确数据类型。比如，调用Promise去获取数据，想知道得到了什么？ 你得去查看JSON的格式，这在TypeScript神奇的智能提示的帮助下（很多编辑器都支持TypeScript的智能提示，比如Webstorm、VSC、Atom等）会变得非常容易。我要给你展示的例子返回了一个Obserable。当我输入response后面的点时，编辑器弹出了非常非常明确的信息，来告诉我该数据的结构信息。

![](https://ws1.sinaimg.cn/large/83900b4ejw1fbcf1ncgx1j21e40n8aff.jpg)

让我们总结下工具支持的几个主要特性：

1. 代码帮助提示（Code Help/ Intellisense）：真的非常nice。
2. 重构（Refactoring）：很牛，比如全局搜索替换。
3. 窥视／跳转（Peek/Go To）：比如，我们可以了解一个对象中有什么，可以从中得到什么，得益于类型，我们可以获取更多的信息。
4. 查找引用（Find References）：比如，查找多少人引用了某个特定方法。

接下来，我们来看下编辑器。这是个名叫dataService的服务（Service，Angular2中的概念）。注意看getCustomers方法，我们假设它会返回一个Observable，我输入this.http.，结果得到了非常友好的帮助提示。

![](https://ws3.sinaimg.cn/mw690/83900b4ejw1fbchcgetl6j20y80eaac7.jpg)

但真正酷的是，如果我想知道HTTP里都有啥，我可以选择“Peek Definition”，然后就跳转到了定义特定类型的位置，于是我又得到了一些有用信息。

![](https://ws2.sinaimg.cn/large/83900b4ejw1fbchg5mn43j20vw072tb3.jpg)

我还可以知道有多少人调用了getCustomers这个方法，只需要点击“Find All References”即可。

![](https://ws1.sinaimg.cn/large/83900b4ejw1fbchkxzecbj20m806mgmj.jpg)


## 接口（Interfaces）

让我们来聊下接口吧，这是TypeScript的另一个秘密武器。接口是个非常棒的技术，在JavaScript中无法直接使用它，但在TypeScript中却可以。接口在ng2里被重度使用。如果你第一次接触接口，我会通过代码合约（Code Contract）这个概念来向你解释。代码合约就是说，你被告知要造一个这样的零件，而不是那样的零件。

![](https://ws3.sinaimg.cn/mw690/83900b4ejw1fbci12wa4wj210a0osad4.jpg)

在开发过程中，我们经常会遇到一个情况，就是开发者开发完的成品并不是我们想要的。通过接口，我可以非常明确，你应该传递给我什么。这是个接口的例子：

![](https://ws2.sinaimg.cn/mw690/83900b4ejw1fbcia59jtaj212w0pw77n.jpg)

我们定义了一个ICustomer接口，你也可以使用class来定义（具体细节可以参考TypeScript文档）。接下来，当我们只输入一个firstName时，收到了报错信息。当再输入lastName时，则提示合法了。

![](https://ws3.sinaimg.cn/mw690/83900b4ejw1fbcidnhtmaj20za0p0gp0.jpg)

这太基础了，让我们回到刚才的代码示例。当我直接在getCustomers方法上输入subsribe时，我得到的智能提示是返回一个Observable of any，这没有任何帮助。但是，当我们在subscribe的参数中填写接口ICustomer[]后，我们得到了非常友好详细的智能提示。

![](https://ws3.sinaimg.cn/mw690/83900b4ejw1fbcilsm7rij20zi0dydiq.jpg)

接口的另一个用法是这样的。比如，你把ngOnInit写成了ngoninit，导致运行结果不对，但是却没有任何提示，这可不是什么好事，就不能给我一点提示吗？ 当然可以，我们可以导入OnInit这个接口 ，然后使用implements将其连到类上：

![](https://ws3.sinaimg.cn/mw690/83900b4ejw1fbcj3pvls1j20vg0kmgqe.jpg)

然后，我们就得到了错误提示。当我们将ngoninit改为ngOnInit时，错误提示就消失了，这太棒了！

## 泛型（Generics）

让我们继续讲解泛型这个秘密武器吧！泛型也非常好用，有人在其他语言中用过泛型吗（然后他把手放到眼上，作远眺状）？泛型是个代码模板（Code Template）。如果你家有小孩，你一定知道曲奇饼干和曲奇饼干成型机（比如图中的剑型）。假如我在用小刀刻了一些字符，比如Halloween。当刻了一两个字符之后，你说突然要换一套方案，这就难办了！所以，你应该刻一些像图中的剑型那样的东西，这样便于你复用（这个例子举得不太好，不过大家只需关注“模板”和“复用”这两个关键词即可，因为这也是泛型的特点）。

![](https://ws3.sinaimg.cn/mw690/83900b4ejw1fbcj8q3w28j20y00nitbg.jpg)

泛型能以多种方式被使用，其中一种方式是，如果你有一个class，需要支持多种类型，比如有时候我需要number，有时候需要string，有时候需要数组，那么泛型将会大显身手！在这个例子中（如图），我们想写一个某种数据类型（用T表示）的列表，请注意add这个方法，它也是模板的一部分。然后使用它的方法就像这样，你可以写`new List<ICustomer>()`，当然`ICustomer`是本例的选择，你可以写number、string等任何类型，然后非常灵活方便地复用它们。回到编辑器中，写一个add方法，当我还没有写完firstName和lastName时，编辑器会报错，写完后，错误提示消失。另外，当我们add一个205时，编辑也会报错。

![](https://ws1.sinaimg.cn/mw690/83900b4ejw1fbclkjpe8ij217q0q2td8.jpg)

让我们回到dataService这个例子吧！当我在getCustomers这个方法后面输入subscribe，它只提示返回一个Observable of all，这不是一个好的智能提示。不过，当我在getCustomers方法后面加上`Observable<Icustomer[]>`后，就会改善很多！再次在在getCustomers这个方法后面输入subscribe，它提示返回了一个Observable of ICustomer[]，非常非常酷。而且，即便当你将subscribe中的参数类型去掉，里面的数据仍然会有非常明显的智能提示（输错字符会报错）。

![](https://ws2.sinaimg.cn/mw690/83900b4ejw1fbclyt5krxj20y00aeacd.jpg)

![](https://ws4.sinaimg.cn/mw690/83900b4ejw1fbcmweuba5j20y207mgnf.jpg)

## 提前使用未来特性（The Future Today）

最后一个秘密武器是提前使用未来特性。JavaScript现今以每年的频率来发布新特性，但是浏览器不能完全支持它们。所以我认为我们一直处于一个“举债经营”的模式，比如使用Typescript。因为我们不想用最低版本的JavaScript，而是想用一些新特性。我们已经在Angular2中做了这些事情，比如使用装饰器（Decorators），我们用装饰器编写组件或Injectable等。还可以使用一些未来的特性，比如async/await（一种新的处理异步的方式）等。

## 回顾

让我们做个回顾吧！我们讲解了TypeScript的这几个方面：类型支持、工具支持、接口、泛型以及提前使用未来特性。

![](https://ws3.sinaimg.cn/mw690/83900b4ejw1fbcmhvrquzj21eo0o6djc.jpg)

想获取代码的话，可以点击如下链接：

![](https://ws2.sinaimg.cn/mw690/83900b4ejw1fbcmilmbykj21760sejxe.jpg)

想获取PPT，可以点击这个链接：

![](https://ws3.sinaimg.cn/mw690/83900b4ejw1fbcmk6ll6aj20ws0pwwhq.jpg)

很感谢你们听我的演讲，希望你们可以用TypeScript编写App，谢谢！

---

## 教程源代码及目录

https://github.com/lewis617/angular2-tutorial





