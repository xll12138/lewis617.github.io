---
title: Emily Gorcenski：物联网的伦理问题（译）
date: 2017-11-02 18:12:00
tags: [技术讲座, 物联网, 伦理学, 电车问题, left-pad, Miri 僵尸网络, Fitbit, 自动驾驶汽车]
---

本文翻译整理自 YouTube 视频：

https://www.youtube.com/watch?v=xLL7Fo_em2E

![](https://ws3.sinaimg.cn/mw690/83900b4egy1fl3vl220z3j20hs0a07ag.jpg)

<!--more-->

非常感谢大家！接下来我要讲的是物联网的伦理问题，保证不会有太多说教哦。我是 Emily Gorcenski，我并不经常在推特上讲物联网这些事，但我却对物联网以及它所构建的蓝图非常感兴趣。那么，我为何要在 JavaScript 大会上讲物联网的伦理问题呢？事情是这样的，我之前已经讲过几次这个主题，而且我开玩笑说，每次我都能给出一个全新的演讲，因为在物联网中，有太多的失败案例、漏洞和安全问题频繁出现。如果我只是专注案例研究，那么每次讲的东西都完全不同。而这次，我决定不这么做了，而是简单聊一下为何伦理很重要，为何伦理对作为 JavaScript 开发者的你很重要，以及我们如何将 JavaScript ，将科技注入一系列原本没有这些技术的设备和服务。聊伦理问题而不提及一些沉重话题是不可能的。所以这里给出了一些警告性的内容（看PPT）：

- 人类伤亡的频繁讨论
- 性侵犯的探讨
- 一张生肉图片（留点悬念）

![](https://ws3.sinaimg.cn/mw690/83900b4egy1fl3vltxrxkj20hs0a0n2v.jpg)

如果这些话题吓到你了，那么我会尽量在十分钟内结束这些话题。

我是谁？这里我需要先承认，我在这个大会上有点像江湖骗子，因为我不是个 JavaScript 开发者。我是个数据科学家，以数学家的方式被培养，但也是个工程师，我在学校学习了航空工程和机械工程。

![](https://ws3.sinaimg.cn/mw690/83900b4egy1fl3vmigt9dj20hs0a0q8a.jpg)

我曾经在航空、生物科技领域工作，现在在金融业。这些领域或行业有个共同点就是，它们都被严格调控。在这些领域工作的人们都会遵循一些专业的伦理法规，通过一个独立社会或其他协助指导什么是道德产品的组织。

当讨论物联网时，总觉得这是个有点空洞无聊的概念。我们会想到智能冰箱、智能汽车这一类东东。我个人更喜欢把物联网想象为：把互联网放进原本不属于它的地方。

![](https://ws3.sinaimg.cn/mw690/83900b4egy1fl3vnei7ngj20hs0a0afh.jpg)

所以物联网可以指智能设备，但我也可以把 Uber 想象为出租车物联网。当我们看待这是否存在伦理问题时，我们必须要看看：我们使用科技做了什么，连接了什么。前后的差异并不在于这些设备、产品或服务有没有被计算机化，而是我们让用户拥有了连接什么的能力。如果你是个 JavaScript 开发者，或许你想要个物联网面包机，这样的话，你就可以在烤面包时插入一些代码进去。这很重要，因为物联网是下一代的便利优化。我们花了30年时间来优化产品使其更加方便易用。所以，现在你有个像冰箱这样的非物联网设备根本没有什么竞争优势。你必须要让它们连接起来！

![](https://ws3.sinaimg.cn/mw690/83900b4egy1fl3vntfc2aj20hs0a0451.jpg)

你或许会关心物联网设备的监控能力，比如监控 Uber 引起的一些惨案。但是如果你没有能力到处逛逛，或没有住在方便打车的地方，或有其他需要，比如 有时候 Uber 可能会成为救生员，这些都改变了你的生活。我们不能简单说物联网是荒谬的、轻浮的，就像个玩具，就像是一个垃圾推特账号，非常滑稽，整天发一下低质量内容。事实上，物联网还是带来了很多好的事情。

当我们说伦理这个词时，我们在说什么？你知道因为自动驾驶汽车，现在[电车问题](https://zh.wikipedia.org/wiki/%E6%9C%89%E8%BD%A8%E7%94%B5%E8%BD%A6%E9%9A%BE%E9%A2%98)很流行。

![](https://ws3.sinaimg.cn/mw690/83900b4egy1fl3vp16viwj20hs0a0dlj.jpg)

你或许已经看过这个图了（看PPT）：一个诺贝尔奖获得者被绑在一个轨道上，另外五个普通人被绑在另一个轨道上。不知怎的，你被安排在控制杠杆的位置上。这是个在互联网上非常流行的问题，因为：一，如果将该问题抽象出来，我们可以用类别理论来解决它。二，这确实是个[网络模因](https://zh.wikipedia.org/wiki/%E7%B6%B2%E8%B7%AF%E7%88%86%E7%B4%85%E4%BA%8B%E7%89%A9)。既然电车问题的关键不在电车，那么为何自动驾驶汽车会成为问题呢？

![](https://ws3.sinaimg.cn/mw690/83900b4egy1fl3vpxw759j20hs0a07al.jpg)

我们喜欢把事情当作难题来解决 - 这就是我们作为开发人员和工程师的本性。在技​​术上，我们实际上并没有经常面临伦理困境。

![](https://ws3.sinaimg.cn/mw690/83900b4egy1fl3vqgbs26j20hs0a0gqt.jpg)

当有两个竞争的伦理框架同时存在，且你的行为不能违反至少其中一个。那么此时，伦理困境就出现了。我认为 JavaScript 非常引人入胜，因为 JavaScript 社区对在未来十年的技术发展中出现的最有意思伦理困境负有责任。这个话题我等会儿会细说，有些人或许已经知道我待会要说什么了。技术的问题是，我们往往不遵守道德准则。我不是说要写一个起诉书，说你是坏的，不道德的人。说到这，有些公司可能要对我斜眼了。但我的意思是，在我们行业，我们没有一个专业的法规。有一些社团，你可以加入。如果你是像 ACM 或 I888 这样的组织的成员，举起你的手。哦，有一些但不是大多数。

在实践中，伦理学是关于损害的分析和风险的缓解。

![](https://ws3.sinaimg.cn/mw690/83900b4egy1fl3vsf3nb2j20hs0a0dkp.jpg)

所以，当我们讨论伦理行为时，特别是伦理研究时，我们要做的不是消除人员受伤的可能性，而是去理解人员可能被科技所伤害的各种方式，寻找能减少风险发生的方法，并在必要时提供整治。当我们为物联网开发各种技术时，上述做法就是我们需要提出的道德框架。事故可能会以三种方式发生： **不法行为**、 **故障**、**边界情况**。

![](https://ws3.sinaimg.cn/mw690/83900b4egy1fl3vt0ro5xj20hs0a0n25.jpg)

不法行为在物联网中是最常见的话题，这是个安全问题，是人们常说的黑客行为。去年秋天，Miri 僵尸网络发生 DDoS 攻击，这是目前的最大的 DDoS 攻击，这次攻击发生在不安全的物联网设备上。你或许知道，物联网安全性现在处于非常糟糕的状态。当这次事故发生时，它的时间安排和方式让很多人担心这是对美国总统大选的攻击的前兆，这将试图影响这次选举的结果。事实证明，这个恐惧是没有根据的。我不想在这次演讲中讨论这个事故。因为，首先我没法覆盖所有事。另外，其他方式的事故依然可能会发生，比如故障和边界情况。当设备在出乎开发人员预料的情况下被运行时，边界情况就会发生。另外值得一提的是，很多时候我们把软件漏洞和边界情况混为一谈，事实上这两者除了表达方式外确实没有太多不同。

这是 Twitter上一个很好的例子。

![](https://ws3.sinaimg.cn/mw690/83900b4egy1fl3vuhafb9j20hs0a0n31.jpg)

这个可怜的绅士安德鲁，有一个物联网的水冷却器，他的 TLS 证书过期了，导致一些阻塞代码，硬件互锁失败，导致他家里都是水。这是一个真实的问题，对吧？是的，这是个真实的问题。如果 TLS 证书在 Web 服务中过期，我们忘记了 TLS 证书，我们有一段阻止代码，这是个操作问题，我们需要有相关人员来处理。但我们无法把物联网设备当成人来看待，我们需要将其当作宠物。这些宠物生活在人类的家里，而且因为没有喂食而非常暴躁易怒。有一天，如果我们不小心把 JavaScript 放入一个物联网水壶，结果因为`"undefined" is not a function`，房子被这个水壶烧了。

另外一个例子，这是我做的，我很自豪。

![](https://ws3.sinaimg.cn/mw690/83900b4egy1fl3vvbezhdj20hs0a0jxc.jpg)

几年前我做了这个，如果可以的话，我想全屏显示。这是一个 [Microsoft Band](https://zh.wikipedia.org/wiki/Microsoft_Band)，我没有故意选择微软的产品。这是一块生鸡肉，我没有对活鸡做一些可怕的事，比如做僵尸鸡。这只是一块我从杂货店买的肉。从视频上看，它正在读取每分钟120次的心率！在现实世界中，传感器是凌乱的、嘈杂的、不完美的。所以当我们设计物联网设备时，我们必须考虑到这一点。可以读一个鸡胸肉的心率是荒谬的，但这可以对很多事产生深刻的影响。举个例子，有一些学校强制学生戴 [Fitbit](https://en.wikipedia.org/wiki/Fitbit)。也有雇主有健康保险激励计划来做这样的事。这样的话，我们就有监控设备，来监测我们的健康状况，并可以及时生成健康报告。这并不是假设的，而是真的发生了。

2015年，一名女子正在兰开斯特 (宾夕法尼亚州)看望一个同事。 她向警方报告性侵犯。警方发现了她的 Fitbit，并在她允许的情况下分析了数据，结果警方不仅停止了调查，还指控该女子假报警。去年，她对承认了这些指控，被定罪并实行缓刑。检方律师说 FitBit 数据也证明了这个。

![](https://ws3.sinaimg.cn/mw690/83900b4egy1fl3vvtjfkcj20hs0a00yu.jpg)

我可以从一块生鸡肉中测出每分钟120次的心率，一个女人的生活也可能会被毁掉，因为没有 Fi​​tBit 的人站起来说不：“我们的设备不是这样准确。” 你不能这样做。我们的设备会出错。问题是我们如何建立它们是没有规定，质量保证或标准的。

![](https://ws3.sinaimg.cn/mw690/83900b4egy1fl3vwsvjthj20hs0a0446.jpg)

我们只是编写代码，制造硬件。 我们创新，快，快，快。我们不问自己，当出现错误时会发生什么样的伤害？而这种情况越来越频繁。这些装置正在用于刑事和民事调查。就在上周，CNN 报道说一个男人被指控谋杀了他的妻子，根据他妻子的 Fitbit 数据记录。任何人带着 Fitbit 走，Fitbit 都会记录，即便当时你正坐在沙发上。我们怎么能让这种事情发生呢？我们怎么能让这种信息影响人们的生活？另一个事件：去年，一个智能水表被用于谋杀调查。

![](https://ws3.sinaimg.cn/mw690/83900b4egy1fl3vxhp998j20hs0a0q9p.jpg)

问题是：谁去监狱？ 当一个设备向警方作出虚假陈述时，谁将要接受缓刑？此外，说一些事情真实发生，说一些事情是假的，说有人受伤或被杀了，如果该设备有故障，谁将承担责任？是设备主人吗？ 是开发者吗？ 是制造设备的公司吗？这似乎应该是一个解决的问题，但事实却没有。这已经发生了。

![](https://ws3.sinaimg.cn/mw690/83900b4egy1fl3vy0pr1qj20hs0a0wk2.jpg)

在这个框架下，你将看到几辆汽车，右边的白色汽车是 Google 自动驾驶汽车，这张图像是静止图像 - 这是从拍摄的视频中截取的屏幕截图，来自在加利福尼亚州山景城的一辆市政公共汽车的行车记录仪。

![](https://ws3.sinaimg.cn/mw690/83900b4egy1fl3vzabk5wj20hs0a0wls.jpg)

那辆 Google SUV 即将在公共汽车前面出来，发生意外。幸运的是，没有人受伤。这是自驾车首次被发现对一次意外承担责任。谷歌说：“我们的错，我们会进行相关损害赔偿。”他们调查了事情经过，得出结论，车子预测了因为我们领先于公共汽车，所以公共汽车应该让着我们。

![](https://ws3.sinaimg.cn/mw690/83900b4egy1fl3vzjc1m6j20hs0a0te9.jpg)

Google 现在正想卖他们的自动驾驶汽车，所以他们当然会承担责任，而不是去法庭上测试他们的车。但是，随着我们进入物联网的未来，我们不能依靠这一点。 一旦这个规模出现，我们就不能依靠仁慈的公司承担责任。顺便说一下，即使 Google 是正确的，这仍然是一个历史时刻。因为如果公共汽车已经让了自动驾驶汽车，这将是市政府的公共汽车第一次屈服！

几年前，旧金山有一名法官。他研究自主系统是否不受现有的责任理论限制。深入研究后，他发现那些自己做决定的，使用神经网络的，使用自适应自调节控制系统的，设计自己的手段来完成任务的机器在现有的侵权理论下，可能不受任何责任。

![](https://ws3.sinaimg.cn/mw690/83900b4egy1fl3w02p1c2j20hs0a00z5.jpg)

这有巨大的影响。因为如果你买普通的冰箱，它会损坏，你可以说，“嘿，制造商， 你负责这个损坏。”如果你买一个咖啡机，并且由于一个小故障，它会烧毁你的房子。但你可以安全地出门，然后从公司和您的保险公司收回损害赔偿。这是一个完整的道德框架，也有法律架构。显然，自驾车将会更安全，他们将会挽救生命。这是一件非常重要的事情。 我们要拯救生命。 我们希望道路更好。但是，救赎的人数并不是我们的道德演算中唯一的术语。我们必须看看当人受伤时发生了什么？ 他们如何被照顾？他们是否能够支付医疗费用或重新上班？还是虽然在他们恢复健康时失去工作，但仍然能够支付租金和买得起食物？

那么关于这个的问题对作为开发人员的我们有什么意义？这是否给我们免费通行证？我们不对 IoT 设备负责。那意味着我们可以做任何事情。让我们创造一切，直到事故发生，直到先例发生。这真的是我们想留下的东西吗？我们是否愿意对我们所制造的东西不负责任，就因为我们可以这么做，就因为我们没有能力给予我们伤害的人任何补偿？ 一些公司实际上仍然只想要创新的环境下工作，他们只想建造东西，运送东西，在事后处理后果。但你必须问自己：我想对此负责吗？这就是伦理或道德关注的。

我说过 JavaScript 社区中有最有意思技术伦理问题之一，比如 [left-pad 事件](http://taobaofed.org/blog/2016/03/31/what-can-we-learn-from-left-pad-event/)。

![](https://ws3.sinaimg.cn/mw690/83900b4egy1fl3w0wggp6j20hs0a00xt.jpg)

当 Ashley 昨天晚上谈到 left-pad，这真的很有意思，因为她看到了这个事件的很多反弹。她表示互联网在 left-pad 发生时被炸毁。人们对很多事情感到愤怒，JavaScript 社区开发了一个小模块系统，也许它是错误的，也许它是正确的，来回有很多争论，甚至在这个事件中失去了友谊。人们没有意识到的是所有愤怒和侮辱，是因为 left-pad 事件实际上暴露了什么是真正的伦理困境。现在我们还只见树木，未见树林。left-pad 事件拥有两个竞争性的伦理决定。一个是极客文化伦理，开源是最重要的事，开源是一种美德。控制你代码就是极客，就是开源开发者。当然，其他人可以 fork 这个模块，但你要选择把它放在哪里。 当 left-pad 作者删除了他的所有模块，并在互联网上打碎了一堆东西。NPM 也提出了自己的伦理框架，NPM 要求模块作者对使用他们模块的产品负有责任。他们有有作为工程师的责任。不过，NPM 依然认为开源有价值。NPM 本身就是个开源社区。所以这本身就是个很难的决定。你能想象如果这件事没有发生在2016年而是2018年，2020年，NPM 在运行在车子、冰箱上，这对整个网络会造成多大的影响？你正在高速公路上以一小时70英里的速度行驶，有人突然删除了一个模块，你的车子出现问题。你认为这不可能发生。 没有人会在运行IoT设备的汽车上进行实时部署。省省吧！就像我们现在在生产系统中做的那样，物联网安全简直就是一团糟。我们正在快速创新，这当然会有问题。你不想成为对冰箱负责的人，让用户失去了所有的食物，或失去了原本在冰箱中的他们需要的重要药物。你不想对此负责，但这是可能发生的。也许你认为开源更重要，那么这才是真正的伦理困境。所以作为工程师，我们要做些什么？当我们谈论伦理时，我们可以做些什么？这是为什么我不想做这个演讲，而是让大家能够做这个演讲，因为我们可以像工程师、开发人员那样做很多可操作的事情，使我们的工作场所更好，做更多有道德的事。

![](https://ws3.sinaimg.cn/mw690/83900b4egy1fl3w1jeodjj20hs0a07a7.jpg)

第一个就是与老板达成期望。如果你的老板有一些压力，要你做一些你觉得不舒服的事情。这时，你需要知道，你可以去找老板，告诉他你不愿意做这个。你需要知道如果你这样做会发生什么？ 这是重要的事情。你也必须准备说不。 如果有人来找你说，“嘿，我需要你编写一种发送方法，将某人的心率跟踪数据实时回到我们的服务器。”你会愿意这样做吗？也许你不愿意，但是你知道如何拒绝吗？你是否愿意拒绝？把你的职业生涯放置于危险的境地，就因为这么做违反了你相信的东西。您还需要能够与您的同事坦诚讨论这意味着什么。我在金融领域工作，我是数据科学家，所以我有大量的人力资料以及这些数据带来的强大能力。所以我们经常讨论，当我们记录客户数据时，当我们记录他们的财务信息时，我们当下的行为会产生什么影响。我们总是在讨论，比如你不愿意做什么？我们有法律义务做什么？在金融领域，我们在报告欺诈方面具有法律责任，例如洗钱。 所以我们必须相互讨论这些事情。作为工程师，你应该能够坦白地和你的同事坦言，“我不喜欢这样做。“ 我们如何确保不会那样？我们如何确保它保持在安全的一面而不是危险的一面？最重要的是知道你的底线，知道你何时愿意收手。因为科技真的有利可图，我们有很多的特权。我们在技术上有很多特权。即使只是看看我们所在的屋子，这也是一个非凡的会议室，这里有各种各样的设施。不是每个行业都这样的。什么是你的底线？超过了这个底线，你应该说：“我不能继续做这个”。如果你不知道这个底线是什么，你不会发现你已经越界了，直到一切已经来不及挽回。这就是我要讲的，非常谢谢大家。

![](https://ws3.sinaimg.cn/mw690/83900b4egy1fl3w2f1szrj20hs0a0n3a.jpg)