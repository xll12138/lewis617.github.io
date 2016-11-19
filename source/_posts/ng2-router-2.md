
---
title: angular2系列教程（十一）路由嵌套、路由生命周期、matrix URL notation
date: 2016-04-04 09:33:00
tags: [Angular2]
---

今天我们要讲的是ng2的路由的第二部分，包括路由嵌套、路由生命周期等知识点。

## 例子

例子仍然是上节课的例子：

![](https://ws2.sinaimg.cn/large/83900b4egw1f9xjj733w0j20bc0a8dgz.jpg)

上节课，我们讲解了英雄列表，这节课我们讲解危机中心。

源代码：

<https://github.com/lewis617/angular2-tutorial/tree/gh-pages/router>

运行方法：

在根目录下运行：

    
    
    http-server

##  路由嵌套

我们在app/app.component.ts中定义了路由url和视图组件，其中包括这样一项：

app/app.component.ts



    
    
    { // Crisis Center child route
        path: '/crisis-center/...',
        name: 'CrisisCenter',
        component: CrisisCenterComponent,
        useAsDefault: true
      },



那个...就是代表这个url下面可以定义子路由，也就是嵌套路由。嵌套路由是如何实现的？很简单，只需要在视图组件中再次配置路由即可：

app/crisis-center/crisis-center.component.ts

    
    
    import {Component}     from 'angular2/core';
    import {RouteConfig, RouterOutlet} from 'angular2/router';
    
    import {CrisisListComponent}   from './crisis-list.component';
    import {CrisisDetailComponent} from './crisis-detail.component';
    import {CrisisService}         from './crisis.service';
    
    @Component({
      template:  `
        <h2>CRISIS CENTER</h2>
        <router-outlet></router-outlet>
      `,
      directives: [RouterOutlet],
      providers:  [CrisisService]
    })
    @RouteConfig([
      {path:'/',    name: 'CrisisList',   component: CrisisListComponent, useAsDefault: true},
      {path:'/:id', name: 'CrisisDetail', component: CrisisDetailComponent}
    ])
    export class CrisisCenterComponent { }

上述代码，我们干了几件事"：

  1. 写了一个组件，包括h2和router-outlet
  2. 使用@RouteConfig，进行路由配置

这样我们就实现了嵌套路由。就是这么简单。

## 路由生命周期

路由跳转到别的视图的时候，会触发一个路由的生命周期钩子：routerCanDeactivate:

app/crisis-center/crisis-detail.component.ts  

    
    
    routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction) : any {
        // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged.
        if (!this.crisis || this.crisis.name === this.editName) {
          return true;
        }
        // Otherwise ask the user with the dialog service and return its
        // promise which resolves to true or false when the user decides
        return this._dialog.confirm('Discard changes?');
      }

这段代码，会在你修改完危机信息后，既不点击save也不点击cancer时候触发。也就是this._dialog.confirm('Discard
changes?');弹出一个对话框：

![](https://ws1.sinaimg.cn/large/83900b4egw1f9xjj4z6gkj20c8058jrg.jpg)

这里为什么要使用单独的dialog服务呢？为何不直接出发window.confirm()？因为路由的生命周期接受bool或者promise对象（ng1也是这样哦）。而window.confirm并不返回一个promise对象，我们需要对其进行包装：  

app/dialog.service.ts

    
    
    import {Injectable} from 'angular2/core';
    /**
     * Async modal dialog service
     * DialogService makes this app easier to test by faking this service.
     * TODO: better modal implemenation that doesn't use window.confirm
     */
    @Injectable()
    export class DialogService {
      /**
       * Ask user to confirm an action. `message` explains the action and choices.
       * Returns promise resolving to `true`=confirm or `false`=cancel
       */
      confirm(message?:string) {
        return new Promise<boolean>((resolve, reject) =>
          resolve(window.confirm(message || 'Is it OK?')));
      };
    }

我们使用promise包装了confirm这个方法，使得这个服务，会触发confirm的同时，最后也能返回一个promise。这样以来我们就可以在路由的生命周期中尽情的使用了！

值得一提的是ng1路由的resolve属性也是接受一个promise，有兴趣的同学可以看我在ng1中对wilddog的路由改装：

https://github.com/lewis617/wild-angular-seed/blob/gh-pages/components/wilddog.utils/wilddog.utils.js#L85

# _matrix URL_ notation

当我们从危机详情视图返回危机列表视图的时候，我们发现我们url变成了：http://localhost:63342/angular2-tutorial/router/index.html/crisis-center/;id=1;foo=foo

;id=1;foo=foo这个参数是我们没有见过的，我们知道query
string一般都是"?"加"&amp;"，而这个参数则使用了";"，这叫做_matrix URL_ notation。  

> _Matrix URL_ notation is an idea first floated in a [1996 proposal](http://www.w3.org/DesignIssues/MatrixURIs.html) by the founder of
the web, Tim Berners-Lee.

> Although matrix notation never made it into the HTML standard, it is legal
and it became popular among browser routing systems as a way to isolate
parameters belonging to parent and child routes. The Angular Component Router
is such a system.

> The syntax may seem strange to us but users are unlikely to notice or care
as long as the URL can be emailed and pasted into a browser address bar as
this one can.

这是ng2官方文档对这个概念的解释，我们从中得知，这个概念用区分参数属于父视图还是子视图。

我们在上节课英雄列表中，发现url是普通的query string。为什么在这里变成了_matrix URL_ notation？因为英雄列表视图没有子视图，没有嵌套路由的概念。而危机中心则使用了嵌套路由，拥有父子视图的嵌套，为了加一区分，ng2的路由系统使用了 matrix
URL  notation这个概念。

* * *

## 教程源代码及目录

如果您觉得本博客教程帮到了您，就赏颗星吧！

<https://github.com/lewis617/angular2-tutorial>



