---
title: C#中的Invoke
date: 2015-04-28 03:47:00
tags: [C#]
---

在用.NET Framework框架的WinForm构建GUI程序界面时，如果要在控件的事件响应函数中改变控件的状态，例如：某个按钮上的文本原先叫“打开”，单击之后按钮上的文本显示“关闭”，初学者往往会想当然地这么写：

void ButtonOnClick(object sender,EventArgs e)

{

    button.Text="关闭";

}

这样的写法运行程序之后，可能会触发异常，异常信息大致是“不能从不是创建该控件的线程调用它”。注意这里是“可能”，并不一定会触发该种异常。造成这种异常的原因在于，控件是在主线程中创建的（比如this.Controls.Add(...);)，进入控件的事件响应函数时，是在控件所在的线程，并不是主线程。在控件的事件响应函数中改变控件的状态，可能与主线程发生线程冲突。如果主线程正在重绘控件外观，此时在别的线程改变控件外观，就会造成画面混乱。不过这样的情况并不总会发生，如果主线程此时在重绘别的控件，就可能逃过一劫，这样的写法可以正常通过，没有触发异常。

正确的写法是在控件响应函数中调用控件的Invoke方法（其实如果大家以前用过C++ Builder的话，也会找到类似Invoke那样的激活到主线程的函数）。Invoke方法会顺着控件树向上搜索，直到找到创建控件的那个线程（通常是主线程），然后进入那个线程改变控件的外观，确保不发生线程冲突。正确写法的示例如下：

void ButtonOnClick(object sender,EventArgs e)

{

    button.Invoke(new EventHandler(delegate

    {

        button.Text="关闭";

    }));

}

Invoke方法需要创建一个委托。你可以事先写好函数和与之对应的委托。不过，若想直观地在Invoke方法调用的时候就看到具体的函数，而不是到别处搜寻的话，上面的示例代码是不错的选择。

这样的写法有一个烦人的地方：对不同的控件写法不同。对于TextBox，要TextBoxObject.Invoke，对于Label，又要LabelObject.Invoke。有没有统一一点的写法呢？

主窗口类本身也有Invoke方法。如果你不想对不同的控件写法不一样，可以全部用this.Invoke：

void ButtonOnClick(object sender,EventArgs e)

{

    this.Invoke(new EventHandler(delegate

    {

        button.Text="关闭";

    }));

}

在C# 3.0及以后的版本中有了Lamda表达式，像上面这种匿名委托有了更简洁的写法。.NET Framework 3.5及以后版本更能用Action封装方法。例如以下写法可以看上去非常简洁：

void ButtonOnClick(object sender,EventArgs e)

{

    this.Invoke(new Action(()=>

    {

        button.Text="关闭";

    }));

}

以上写法往往充斥着WinForm构建的程序。

在微软新一代的界面开发技术WPF中，由于界面呈现和业务逻辑原生态地分开在两个线程中，所以控件的事件响应函数就不必Invoke了。但是，如果手动开辟一个新线程，那么在这个新线程中改变控件的外观，则还是要Invoke的。