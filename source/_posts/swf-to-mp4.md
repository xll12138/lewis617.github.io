---
title: 如何将qq邮箱中的贺卡转换为mp4发给微信好友
date: 2016-12-31 10:06:00
tags: [swf,mp4,ffmpeg]
---

今天是2016年的最后一天，想着给微信好友发一张节日贺卡，思来想去，觉得还是qq邮箱中的贺卡最精美，就决定将其转换为mp4发给微信好友，现将整个过程记录如下。

<!--more-->

## 从qq邮箱中爬出swf文件

首先，我们登陆qq邮箱，选择一张喜欢的贺卡并打开：

![](https://ws1.sinaimg.cn/large/83900b4egw1fbabzunck1j21kw0wmgop.jpg)

然后右键单击贺卡，选择“检查”以打开开发者工具中的“Elements”选项卡，在其中找到该贺卡的URL（是个swf文件），最后将其下载下来。

## 将swf文件转换为mp4文件

由于swf文件无法作为视频发送给微信好友，所以我们还需要将其转换为mp4文件.作为一名开发者，本想使用ffmpeg命令行工具来进行转换，不料该工具转换出的mp4文件只有声音没有视频。由于马上就跨年了，没有时间研究里面的具体细节，所以决定使用成熟的图形化软件来进行转换，在YouTube视频的推荐下，我选择了[swivel](http://www.newgrounds.com/wiki/creator-resources/flash-resources/swivel)这款免费软件。

首先，登陆[swivel的官网](http://www.newgrounds.com/wiki/creator-resources/flash-resources/swivel)进行下载安装，然后选择要被转换的swf文件，并进行相关参数的设置，我选择了缺省参数，最后点击“CONVERT”，进行格式转换。

![](https://ws1.sinaimg.cn/large/83900b4egw1fbacbqb7y7j20jg0bsn0g.jpg)

## 将视频文件发给好友

打开微信，将上步转换好的mp4文件发给好友。至此，所有的工作就都完成了。

## 总结

本次操作并无太大难度，但是在“将swf文件转换为mp4文件”这一步花费了较多时间，原因是太多的转换软件效果不理想，它们不是只能转视频，就是只能转音频。在没有找到理想的软件前，我甚至还使用了iMovie来将音视频文件进行合并。

另外，在遇到ffmpeg命令行工具的问题时，没有“打破沙锅问到底”，这是作为一名开发者所不应该有的习惯。但是从另一方面来说，“不要重复造轮子”也是对的，解决问题的方法有很多种，也不能中二地坚持“技术改变世界”的天真想法。
