---title: win7下串口通信date: 2015-04-28 02:58:00tags: [串口通信]---最近做个串口开发，在PC上调试需要用虚拟串口调程序，而常用的VSPM貌似对win7不兼容，看到个VSPD，可以在win7上建虚拟串口，简单方便，网址[http://www.qiujicai.com/?post=42](http://www.qiujicai.com/?post=42 "http://www.qiujicai.com/?post=42")上有简单使用说明和文件下载。

安装方法：

1、解压  
2、请先运行目录NT6 下的vsbsetup.exe；  
3、返回根目录，直接运行vspdconfig.exe即可。

    如添加com2和com3的虚拟串口如下

[![image](http://s8.sinaimg.cn/middle/6163bdeb4c52b145ed467&amp;690 "image")](http://photo.blog.sina.com.cn/list/blogpic.php?pid=6163bdeb4c52b145ed467&bid=6163bdeb0102e8iy&uid=1633926635)

    这样com2和com3就可以通信了，如下

[![image](http://s6.sinaimg.cn/middle/6163bdeb4c52b146e13b5&amp;690 "image")](http://s13.sinaimg.cn/middle/6163bdeb4c52b146d4afc&amp;690)