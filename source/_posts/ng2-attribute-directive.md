
---
title: angular2系列教程（四）Attribute directives
date: 2016-02-18 03:05:00
tags: [Angular2]
---

今天我们要讲的是ng2的Attribute
directives。顾名思义，就是操作dom属性的指令。这算是指令的第二课了，因为上节课的components实质也是指令。

# 例子

![](data:image/png;base64,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)

这个例子共两个指令，第一个是redify指令，能使元素的color属性变红。另外一个直接复制官网的highlight指令，但是我自己做了很多变化，来讲解写法的多样化。

[源代码](https://github.com/lewis617/angular2-tutorial/tree/master/directives)

# @Directive

写指令，你需要从'angular2/core'中导入Directive，然后使用@Directive装饰器去装饰一个类：

app/directives.ts

    
    
    import {Directive, ElementRef, Renderer} from 'angular2/core';
    
    @Directive({
      selector: '[redify]'
    })
    export class Redify {
    
      constructor(private _element: ElementRef, private renderer: Renderer) {
          renderer.setElementStyle(_element.nativeElement, 'color', 'red');
      }
    }

这段代码做了这些事：

  1. 在装饰器@Directive中定义选择器redify
  2. 在类Redify中的构造函数里面注入ElementRef，来获取当前的dom元素
  3. 同样注入Renderer服务来操作dom，使其color属性为红色

服务是可以注入指令的。Renderer服务提供了多种操作dom样式的方法。

[Official docs for ElementRef](https://angular.io/docs/ts/latest/api/core
/ElementRef-class.html)

[Official docs for Renderer](https://angular.io/docs/ts/latest/api/core
/Renderer-class.html)

# 事件监听

如何实现指令的事件监听呢？答案是设置host：

src/app/highlight.directive.ts

    
    
      host: {
        '(mouseenter)': 'onMouseEnter()',
        '(mouseleave)': 'onMouseLeave()'
      }

我们在@Directive中设置host元数据，host是个对象，你可以通过host配置指令的事件监听，当事件发生，将触发相应的成员函数。本例子中，设置了鼠标进入和离开两个鼠标事件。并在类中编写相应的成员函数：

src/app/highlight.directive.ts

    
    
     onMouseEnter() { this._highlight(this.highlightColor || this._defaultColor); }
      onMouseLeave() { this._highlight(null); }

# @Input

如果需要向指令中输入什么，那么需要@input这个装饰器，从'angular2/core'中导入Input即可使用：

    
    
    @Input('myHighlight') highlightColor: string;
    
      private _defaultColor = 'red';
      @Input() set defaultColor(colorName:string){
        this._defaultColor = colorName || this._defaultColor;
      }

上述代码我们做了几件事：

  1. 给成员变量highlightColor，装饰一个@Input('myHighlight')，使其等于从myHighlight输入的属性
  2. 设置一个私有成员变量_defaultColor
  3. defaultColor属性有个setter，可以重写_defaultColor变量，使_defaultColor等于从defaultColor属性输入的值或者其本身默认值

 这都什么鬼？没有接触过装饰器的同学可能觉得不舒服。这是es7里面的语法糖，python里面也有，是一种函数式编程。装饰器实质是个函数，可以多个嵌套装饰。

指令的@Input装饰器，有两种写法：

一就是给成员变量加个装饰器：

    
    
    @Input('myHighlight') 
    highlightColor: string;

代表从myHighlight属性输入的值会赋给成员变量highlightColor。

二就是使用set，编写一个函数，重写相关的成员变量，不明白get 和set 用法的同学可以参考这个：
[getters](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/get)
and
[setters](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/set)

    
    
    private _defaultColor = 'red';
      @Input() set defaultColor(colorName:string){
        this._defaultColor = colorName || this._defaultColor;
      }



我们来两个替换一下把：

    
    
    private highlightColor:string;
      @Input() set myHighlight(colorName:string){
        this.highlightColor=colorName
      }
    
      @Input('defaultColor')
      private _defaultColor = 'red';

仍然可以运行！

# 使用指令

导入指令的类，然后注入组件的directives中[Redify,HighlightDirective]，就可以在模板中使用指令了，这跟组件嵌套是一样的。

app/app.ts

    
    
    import {Component} from 'angular2/core';
    import {bootstrap} from 'angular2/platform/browser';
    import {Redify} from './directives';
    import {HighlightDirective} from './highlight.directive';
    
    @Component({
        selector: "app",
        directives:[Redify,HighlightDirective],
        template: `
        redify:
          <p redify >hello,lewis</p>
         myHighlight:
            <div>
              <input type="radio" name="colors" (click)="color='lightgreen'">Green
              <input type="radio" name="colors" (click)="color='yellow'">Yellow
              <input type="radio" name="colors" (click)="color='cyan'">Cyan
            </div>
          <p [myHighlight]="color">Highlight me!</p>
          <p [myHighlight]="color" [defaultColor]="'violet'">Highlight me too!</p>
        `
    })
    export class App {
        constructor() {
    
        }
    }
    
    bootstrap(App, [])
        .catch(err => console.error(err));
    
                    

我们可以看到&lt;p redify &gt;hello,lewis&lt;/p&gt;，redify指令就是元素的一个属性而已。

而highlight则使用了[]

    
    
    <p [myHighlight]="color">Highlight me!</p>
          <p [myHighlight]="color" [defaultColor]="'violet'">Highlight me too!</p>

我们在模板语法里面讲过，[]是单向属性绑定的语法，里面可以是任何hmtl5属性，当然也可以是我们拓展的html属性，即指令。毕竟angular仍然是"旨在拓展html能力"。

[myHighlight]="color"将成员变量color绑定在myHighlight属性中，[defaultColor]="'violet'"给defaultColor设置了'violet'的值。

* * *



# 教程源代码及目录

如果您觉得本博客教程帮到了您，就赏颗星吧！

<https://github.com/lewis617/angular2-tutorial>



