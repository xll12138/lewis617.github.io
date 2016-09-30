
---
title: angular开发者吐槽react+redux的复杂：“一个demo证明你的开发效率低下”
date: 2016-01-13 04:02:00
tags: [Angular, React, Redux]
---

曾经看到一篇文章，写的是jquery开发者吐槽angular的复杂。作为一个angular开发者，我来吐槽一下react+redux的复杂。

## 例子

为了让大家看得舒服，我用最简单的一个demo来展示react+redux的"弯弯绕"，下面这个程序就是我用react和redux写的。然而这个程序在angular中一行js都不用写！！！

![](http://images2015.cnblogs.com/blog/814069/201601/814069-20160111143658147-536503061.gif)

## 展示组件

App.js

    
    
    import React, { findDOMNode, Component } from 'react';
    import ReactDOM from 'react-dom';
    import { connect } from 'react-redux';
    import * as action from './actions'
    
    class App extends Component {
      render() {
        return (
          <div>
            <input type='text' value={this.props.propsValue} onChange={this.changeHandle.bind(this)} ref="input"/>
            {this.props.propsValue}
          </div>
        );
      }
      changeHandle(){
        const node = ReactDOM.findDOMNode(this.refs.input);
        const value = node.value.trim();
        this.props.change(value);
      }
    }
    
    function mapStateToProps(state) {
      return {
        propsValue: state.value
      }
    }
    
    //将state的指定值映射在props上，将action的所有方法映射在props上
    export default connect(mapStateToProps,action)(App);

没有玩过redux的同学们可能已经看得有点晕了，redux的设计是这样的：

![](data:image/png;base64,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)

state就是数据，组件就是数据的呈现形式，action是动作，action是通过reducer来更新state的。

上述代码，我们干了三件事：

  1. 编写一个可视化组件（其实就是个input）;
  2. 将state的value属性绑定在组件的props上;
  3. 将action的所有方法绑定在组件的props上。

## action和reducer两个好基友负责更新state

 actions.js

    
    
    //定义一个change方法，将来把它绑定到props上
    export function change(value){
        return{
            type:"change",
            value:value
        }
    }

reducers.js

    
    
    //reducer就是个function,名字随便你起，功能就是在action触发后，返回一个新的state(就是个对象)
    export default function change(state,action){
      if(action.type=="change")return{value:action.value};
      return {value:'default'};
    }

 上述代码我们就干了一件事：用户触发action后，更新状态。

因为状态和组件的props是绑定的，所以，组件也跟着变化了！

## store出场，将reducer注入组件

index.js

    
    
    import React from 'react'
    import { render } from 'react-dom'
    import { createStore } from 'redux'
    import { Provider } from 'react-redux'
    import App from './App'
    import inputApp from './reducers'
    
    let store = createStore(inputApp);
    
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.querySelector("#app")
    );

provider是组件顶层，用来乘放store。

上述代码，我们干了三件事：

  1. 将reducer放进store
  2. 将store放进provider
  3. 将provider放在组件顶层，并渲染

## 最后用webpack编译运行

webpack.config.js

    
    
    var path = require('path');
    var webpack = require('webpack');
    
    module.exports = {
        entry: {
            app:path.join(__dirname, 'src'),
            vendors: ['react','redux']
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name].js'
        },
        module: {
            loaders: [
                {
                    test:/\.js?$/,
                    exclude:/node_modules/,
                    loader:'babel',
                    query:{
                        presets:['react','es2015']
                    }
                }
            ]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
        ]
    };

## 好了，开始吐槽

槽点如下：

  1. 概念太多，props,state,action,reducer,store,provider,就这还没引入router呢,对新手而言，无法在脑海中立马形成一个清晰的流程
  2. 很多概念冗余，比如reducer和store
  3. 很简单一个功能，写了这么多代码，如果用angular一行代码都不用写
  4. 看看我们为了虚拟dom的高性能以及服务器渲染，牺牲了多少，虚拟dom的设计如果被angular引入，那么react的优点何在？
  5. 看看react所谓的简单，平滑的学习曲线，在引入某种框架后，还不是照样复杂。react本身非常简单，可是又有什么用呢？我们绝大多数人，还不是得结合backbone或者angular或者flux，reflux,redux来用。这样看来还简单吗？
  6. 更新太快，如果我不列出package.json清单，几个月后你能运行这个程序吗？
  7. 一个页面的HTML模板被完全碎片化了，angular的指令虽说也有此嫌疑，但是angular旨在"拓展html的能力"，并没有完全碎片化模板。
  8. ……

这些想法，我想对于angular开发者来说，都是有共鸣的。

没有用过angular的react开发者觉得react好，可能是因为他们没有用过angular，拿react和jquery对比得出的结论。

用过angular的react开发者觉得react好，无非就是因为

  1. react牛逼的服务器渲染
  2. diff算法带来的高性能。

但是，不考虑性能和seo，单从开发效率上来讲，angular以及mvvm的其他框架相对优秀一点！

当然这里还有适用场景的问题，因为我们研究所目前在做的是大数据平台，全是crud和表单，使用angular开发会非常合适。

## 一定要看

最后，我想说这篇文章中的demo有一定的局限性。因为redux是用来管理状态的框架，通常在大型复杂的项目中会发挥优势，而我用这样一个简单的demo来说明问题，有点以管窥豹的意思。

在大型项目中，单一数据源以及只读的state，会让你的程序的状态管理非常清晰。为什么？因为我们要更改state，只能通过action，action是我们自己定义的，我们可以预测这个action将带来怎样的改变，而且会留下痕迹，便于管理和掌控程序数据流程。

当然初学者也可以通过这篇文章来学习react+redux。

示例代码：

<https://github.com/lewis617/react-redux-tutorial/tree/master/input-redux>

运行方法：

npm install

npm run build

手动打开index.html



