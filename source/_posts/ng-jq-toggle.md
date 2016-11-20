---
title: AngularJs与jQuery特效slidetoggle结合
date: 2015-09-29 17:10:00
tags: [Angular, jQuery]
---

之前使用jquery的slidetoggle方法，可以轻易的实现元素的收缩展开；使用angularjs后，没有找到相关的方法，通过多方面查资料，自己写了个demo，展示slidetoggle的angularjs写法：

html

```
<div ng-controller="ctrl_main">
    <li ng-repeat-start="el in list" ng-click="$index=!$index">{{el.name}}</li>
    <li ng-repeat-end slide-toggle="$index">{{$index}}</li>
</div>
```

控制器ctrl_main

```
app.controller('ctrl_main', function ($scope) {
        $scope.list=[{name:'lewis'},{name:'susan'},{name:'alice'},{name:'jay'}]
    });
```

指令drtv_slidetoggle

```
 app.directive('slideToggle', function() { return {
            restrict: 'A',
            scope:{
                isOpen: "=slideToggle" },
            link: function(scope, element, attr) {
                scope.$watch('isOpen', function(newVal,oldVal){ if(newVal !== oldVal){
                        element.stop().slideToggle('slow');
                    }
                });
            }
        };
    });
```

运行效果：

![](https://ws1.sinaimg.cn/large/83900b4egw1f9yh3pkrm5j20c705caav.jpg)

点击其他人名，也是一样的。

总体思路就是编写指令，通过改变指令的值![](https://ws2.sinaimg.cn/large/83900b4egw1f9yh3pdvz6j204800jweb.jpg)，来控制当前元素的收缩展开。

===不用requirejs的同学就可以不往下看了===

【ps】将该指令用requirejs封装成指令模块，引用就可以在你的项目中使用了；

requirejs封装的指令模块，新建js,命名为drtv_slidetoggle.js：

```
define(['app','jquery'], function (app) {
    app.directive('slideToggle', function() { return {
            restrict: 'A',
            scope:{
                isOpen: "=slideToggle" },
            link: function(scope, element, attr) {
                scope.$watch('isOpen', function(newVal,oldVal){ if(newVal !== oldVal){
                        element.stop().slideToggle('slow');
                    }
                });
            }
        };
    });
});
```

在启动app时候调用：

```
 require(['angular', 'domReady!','ctrl_main','drtv_slidetoggle'], function (angular) {
            angular.bootstrap(document, ['app'])
        });
```