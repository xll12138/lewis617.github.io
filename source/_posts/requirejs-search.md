
---
title: RequireJs调研
date: 2015-09-26 11:02:00
tags: [RequireJs]
---

# 背景

## Problem（问题）



  * Web sites are turning into Web apps（网站正转变为网络应用程序）
  * Code complexity grows as the site gets bigger（代码复杂度随着站点变大而变复杂）
  * Assembly gets harder（组装变得更难【ps】这里我个人认为"组装"是拼接单个js文件中的昂多的代码段 ）
  * Developer wants discrete JS files/modules（开发者想分离js文件/模块）
  * Deployment wants optimized code in just one or a few HTTP calls（网站部署者想通过使用一个或者很少http请求来优化代码）







## Solution（解决方案）  

  * Front-end developers need a solution with:（前端工程师需要一个解决方案，拥有这些功能：）
  * Some sort of #include/import/require（一些引入文件的命令语句）
  * ability to load nested dependencies（加载嵌套的依赖文件）
  * ease of use for developer but then backed by an optimization tool that helps deployment（简单好用，但也有助于优化部署）  

# RequireJs简介

## 作用  

RequireJS的目标是鼓励代码的模块化，它使用了不同于传统script标签的脚本加载步骤。可以用它来加速、优化代码，但其主要目的还是为了代码的模块化。它鼓励在使用脚本时以module
ID替代URL地址。

## 优点  

### 速度快

![15085801_CrX1](http://images.cnitblog.com/blog/139239/201408/131435005307505.png)

[有位网友做了对比测试](http://www.cnblogs.com/powertoolsteam/p/RequireJS_wijmo.html)

### 依赖关系清晰

![JavaScript
文件之间的依赖项表示。](http://wwwimages.adobe.com/content/dam/Adobe/en/devnet/html5/articles
/javascript-architecture-requirejs-dependency-management/fig01.png)

requirejs通过a.js调用b.js,b.js调用c.js,c.js调用d.js的原理，让我们可以只调用a.js，就可以加载所有的js,而且依赖关系非常清晰。  
      
js文件不仅可以调用js，还能调用css和html页面，所以毫不夸张地说，引入一个入口js，无需向 HTML 文件添加任何其他元素即可构建大型单页面应用程序

### 鼓励代码模块化（最大优点）

![](data:image/png;base64,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)

使用requirejs，我们就需要将原来在一个js文件里面写的代码，按照模块解耦分离成多个js文件，然后按照需求调用。这样做的好处很多：

解耦了，就不会出现牵一发动全身的情况，便于日后维护；还能便于多人分工合作；还能复用...

# 在项目中使用RequireJs

## 调用第三方插件

### 使用多选插件



    
    
     require(['jquery.shiftcheckbox'], function () {
                $(function () {
                    $('#demo2 :checkbox').shiftcheckbox();
                })
            })







### 使用'bootstrap', 'jquery.form', 'jquery.validate'三个插件



    
    
    require(['bootstrap', 'jquery.form', 'jquery.validate'], function () {
        $(function () {
            jQuery.validator.addMethod("isZipCode", function (value, element) {
                var tel = /^[0-9]{6}$/;
                return this.optional(element) || (tel.test(value));
            }, "请正确填写您的邮政编码");
            $("#signupForm").validate({
                rules: {
                    firstname: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    password: {
                        required: true,
                        minlength: 5
                    },
                    confirm_password: {
                        required: true,
                        minlength: 5,
                        equalTo: "#password"
                    },
                    isZipCode: {
                        isZipCode: true
                    }
                },
                messages: {
                    firstname: "请输入姓名",
                    email: {
                        required: "请输入Email地址",
                        email: "请输入正确的email地址"
                    },
                    password: {
                        required: "请输入密码",
                        minlength: jQuery.format("密码不能小于{0}个字 符")
                    },
                    confirm_password: {
                        required: "请输入确认密码",
                        minlength: "确认密码不能小于5个字符",
                        equalTo: "两次输入密码不一致不一致"
                    }
                }
            });
            $("#signupForm").ajaxSubmit();
        });
    });







## 调用自己写的方法或者类

### 调用日期方法类



    
    
    /**
     * Created by lewis on 15-9-15.
     */
    //自定义的命名空间，用来对日期进行操作
    define([],{
        //输入json日期获取年
        getYear: function (jsonDate) {
            var dateArry = jsonDate.split('-');
            var jsonyear = parseInt(dateArry[0]);
            return jsonyear;
        },
        //输入json日期获取月
        getMonth: function (jsonDate) {
            var dateArry = jsonDate.split('-');
            var jsonmonth = parseInt(dateArry[1]);
            return jsonmonth;
        },
        //输入json日期获取日
        getDay: function (jsonDate) {
            var dateArry = jsonDate.split('-');
            var jsonday = parseInt(dateArry[2]);
            return jsonday;
        },
        //输入json日期和日历日期（后面的年）,判断json日期是否在两年内
        isInYear: function (jsonDate, calenYear) {
            var jsonArry = jsonDate.split('-');
            var jsonyear = parseInt(jsonArry[0]);
            if (jsonyear == calenYear || jsonyear == (calenYear - 1))
                return true;
            else
                return false;
        },
        //输入json日期和日历日期（年和月），判断json日期是否在日历日期内
        isInMonth: function (jsonDate, calendarDate) {
            var jsonArry = jsonDate.split('-');
            var jsonyear = parseInt(jsonArry[0]);
            var jsonmonth = parseInt(jsonArry[1]);
            var calenArry = calendarDate.split('-');
            var calenyear = parseInt(calenArry[0]);
            var calenmonth = parseInt(calenArry[1]);
            if (jsonyear == calenyear && jsonmonth == calenmonth)
                return true;
            else
                return false;
        },
        getNowFormatDate: function () {
            var date = new Date();
            var seperator = "-";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            var currentdate = year + seperator + month + seperator + strDate;
            console.log(currentdate);
            return currentdate;
        },
        getDateFromYMD: function (a) {
            var arr = a.split("-");
            var date = new Date(arr[0], arr[1], arr[2]);
            return date;
        }
    });



调用：

    
    
     require(['common/myDateClass'], function (myDateClass) {
    。。。
    。。。
    }）

## 调用代码段（任性！！！）

a.js

    
    
    function myFunctionA(){
        console.log('a');
    };

b.js

    
    
    function myFunctionB(){
        console.log('b');
    };

调用：

    
    
    require(['js/ab/a','ab/b.js'],function(){
        myFunctionA();
        myFunctionB();
    });







