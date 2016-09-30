
---
title: react+redux教程（八）连接数据库的redux程序
date: 2016-02-03 09:00:00
tags: [React, Redux]
---

前面所有的教程都是解读官方的示例代码，是时候我们自己写个连接数据库的redux程序了！

# 例子

![](http://images2015.cnblogs.com/blog/814069/201602/814069-20160203151213100-962178808.gif)

这个例子代码，是我自己写的程序，一个非常简单的todo，但是包含了redux插件的用法，中间件的用法，连接数据库的方法等多个知识点。

源代码：

<https://github.com/lewis617/react-redux-tutorial/tree/master/redux-wilddog-
todos>

运行方法：

npm install

npm run build

手动打开index.html

# wilddog数据库

作为一名曾经的angular开发者，我非常喜欢用firebase来做自己的数据库，并结合angular实现酷炫的"三向数据绑定"。wilddog是中国的"firebase"，不仅语法兼容，而且国内速度更快。

下面的程序都是基于wilddog和angular的程序，也用了我曾经的最爱requirejs，有兴趣的同学可以看看，顺便赏我点star哈哈！

<https://github.com/lewis617/wild-angular-seed>

<https://github.com/lewis617/daily-task>

如今写react程序，仍然可以使用wilddog或者firebase，不仅不用配置数据库服务，也不用写数据库增删改查的api程序了，可以让我们前端工程师专注于写前端程序！

<https://www.wilddog.com/>

# redux的chrome插件

本程序也用到了redux的chrome插件，可以帮助我们自动生成redux的devtool界面，非常好用啊！只需要在你的程序store注册中，加入一行代码：

    
    
    export default (initialState) => {
      const store = compose(
          applyMiddleware(
              thunk,
              createLogger()
          ),
          window.devToolsExtension ? window.devToolsExtension() : f => f
      )(createStore)(reducers, initialState);
    
      return store;
    };

就是这行代码：

    
    
    window.devToolsExtension ? window.devToolsExtension() : f => f

安装方法，就是去chrome的市场搜索redux关键字就可以了！

# 没有服务端渲染和热替换

为什么要把这个单独提起来说呢？这是一个历史遗留问题。我们研究所用的web框架是flask，一个python框架，包括前端也是用flask的jinja模板。没有nodejs也就意味着无法使用服务端渲染和热替换这两个炫酷的功能。

那么不是基于nodejs的前端程序，还能否使用redux和react呢？当然可以，我只通过webpack生成一个js文件，将js文件放进html里面。其他所有的功能都不要。这也是可以的。这也算是结合非node平台的一个实践经验吧！当然你的包管理还得用npm。

从另一个方面来说，基于nodejs的前端时代已经来临，如果你拒绝它，将会失去很多，或者寸步难行！

# 获取所有的todos

我们在action中进行http请求和服务端交互，即便是在中间件中执行http请求，其实质也是dispatch的封装。那么这个程序的关键就是action的编写。

实例化wilddog，定义action类型:

actions.js

    
    
    import Wilddog from 'wilddog/lib/wilddog-node'
    /*
     * action 类型
     */
    export const GET_TODO_ERROR = 'GET_TODO_ERROR';
    export const GET_TODO_OK = 'GET_TODO_OK';
    export const ADD_TODO_ERROR = 'ADD_TODO_ERROR';
    export const ADD_TODO_OK = 'ADD_TODO_OK';
    export const REMOVE_TODO_OK = 'REMOVE_TODO_OK';
    export const REMOVE_TODO_ERROR = 'REMOVE_TODO_ERROR';
    
    let wilddog=new Wilddog('https://redux-wilddog-todos.wilddogio.com')

从wilddog数据库中获取所有的todos，因为wilddog数据库是树状结构，生成的列表，其实质也是个对象，所以我们需要将其转化为数组：

    
    
    export function getTodo() {
      return (dispatch,getState)=>{
    
        wilddog.child('todos').once('value',(snapshot)=>{
          let obj=snapshot.val();
          let array=[];
          for(let key in obj){
            array.push({key:key,text:obj[key].text})
          }
          dispatch({
            type: GET_TODO_OK,
            payload: array
          })
        },(err)=>{
          dispatch({
            type: GET_TODO_ERROR,
            payload: err
          })
        });
    
    
      }
    }

wilddog.child('todos').once('value',function)是获取'todos'节点数据的方法。获取到数据后，转化为数组。然后dispatch一个GET_TODO_OK，告诉reducer获取数据成功，可以更新state了。数据都装在payload中。如果失败，则dispatch一GET_TODO_ERROR。

就是这么简单，不用写后台程序，在js中直接操作数据库！

那么在哪里执行这个getTodo呢？你可以在组件渲染后dispatch它，也可以在初始化store后，立即执行它。我用的是后面一种：

index.js



    
    
    import { getTodo,registerListeners} from './actions'
    
    let store = createStore();
    
    store.dispatch(getTodo())
    



# 添加新的todo

在action中定义添加todo的方法：

actions.js

    
    
    export function addTodo(text) {
      return (dispatch,getState)=>{
    
        wilddog.child('todos').push({
          text
        },(err)=>{
          if(err){dispatch({type:ADD_TODO_ERROR,payload:err})}
        });
      }
    }

通过wilddog.child('todos').push()方法，直接往数据库中插入数据，第二参数是回调，失败的话，dispatch相应的action。

那么成功后的action在哪执行？我们需要再写一个function，绑定数据变动的回调。其实正常情况下，我们在这个function中就直接写成功后的回调了，主要是因为wilddog数据库的成功回调不在push这个方法中。

actions.js

    
    
    export function registerListeners() {
      return (dispatch, getState) => {
    
        wilddog.child('todos').on('child_removed', snapshot => {
          dispatch({
            type: REMOVE_TODO_OK,
            payload: snapshot.key()
          })
        });
    
        wilddog.child('todos').on('child_added', snapshot => dispatch({
          type: ADD_TODO_OK,
          payload: Object.assign({},snapshot.val(),{key:snapshot.key()})
        }));
    
      };
    }

wilddog.child('todos').on('child_added')
这个方法定义了添加todo成功后的回调，我们执行了一个ADD_TODO_OK 的action，并把新的todo对象放在payload中返回给reducer。

你也看到了，我们顺便把移除todo成功的回调也定义了。

我们在哪执行这个绑定函数呢？就在获取所有todos的后面吧！其实放在组件渲染完也可以！

index.js

    
    
    store.dispatch(registerListeners())

# 移除指定todo

在action中添加移除todo的方法：

actions.js

    
    
    export function removeTodo(key) {
      return (dispatch,getState)=>{
    
        wilddog.child(`todos/${key}`).remove((err)=>{
          if(err)dispatch({type:REMOVE_TODO_ERROR,payload:err})
        });
      }
    }

通过wilddog的remove方法移除数据库的指定节点。就是这么简单！然后编写失败后的回调以及action！

# 数据库在action中完事，state还需要reducer

数据库我们是操作完啦，不过组件的显示是基于state的，我们还要同步更新state，那么reducer就出场了！

reducers.js

    
    
    import { combineReducers } from 'redux'
    import { ADD_TODO_OK, REMOVE_TODO_OK ,GET_TODO_OK} from './actions'
    
    function todos(state=[], action) {
      switch (action.type) {
        case GET_TODO_OK:
          return action.payload
        case ADD_TODO_OK:
          return [
            ...state,
            action.payload
          ]
        case REMOVE_TODO_OK:
          return state.filter((todo)=>todo.key!==action.payload
          )
        default:
          return state
      }
    }
    
    const todoApp = combineReducers({
      todos
    })
    
    export default todoApp

很简单，如果你还不会，可以去前面几节教程补课。

来个图吧：

![](data:image/png;base64,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)

action操作数据库后，要在回调中返回信号，让reducer更新state，因为只有state变了，组件才会变。state变了，组件自动就变了，至少不用苦逼地操作dom了，还是挺开心的！

# 为什么不提react组件

说了这么多我们的redux容器算是搞定了，为什么不提组件？不是不提，是要让大家知道，组件和redux容器的耦合度很低，我们可以完全将它们隔离开来编写，通过一些固定的套路将它们连接起来。什么套路？

  1. 绑定state到props
  2. 绑定action到props（可选）
  3. 将store注入，并用provider在顶层包住组件

redux是个状态容器，只能通过发起action改变state，这种集中管控的做法让状态管理和预测变的简单。组件只是state的展现形式而已！react只是一个界面库而已！



* * *

#  

# 教程源代码及目录

如果您觉得本博客教程帮到了您，就赏颗星吧！

<https://github.com/lewis617/react-redux-tutorial>



