---
title: 用更少的代码发起异步 action
date: 2016-12-1 04:18:00
tags: [Redux, redux-amrc]
---

很多人说 Redux 代码多，开发效率低。其实 Redux 是可以灵活使用以及拓展的，经过充分定制的 Redux 其实写不了几行代码。今天先介绍一个很好用的 Redux 拓展—— [redux-amrc](https://github.com/lewis617/redux-amrc)。它可以帮助我们使用更少的样板代码发起异步 action。

<!--more-->

## 低效的过去

一般情况下，为了清楚地记录异步的过程，我们需要使用 三个 action 来记录状态变化。通常，我们的代码会是这样：

```js
const LOAD = 'redux-example/auth/LOAD';
const LOAD_SUCCESS = 'redux-example/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/auth/LOAD_FAIL';
```

写完这么多 action，还要在异步的前后发起它们，当然这时你可能会用中间件，所以你的代码最少也会是这样：

```js
export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/loadAuth')
  };
}
```

发起 action 后，还要编写 reducer 来处理这些 action，以改变状态：

```js
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
	default:
      return state;
  }
}  
```

这太痛苦了，不就是发起一个异步吗？非要让我写这么多代码？

其实，上述过程是可以简化的。记得有篇文章叫《超过90秒的任务不自动化，你好意思说自己是黑客？》，前端工程师也应该具有黑客精神，接下来就让我们使用 redux-amrc 将上述过程简化。

## 轻松的现在

使用了 redux-amrc 后，再也不用写这么多 action了，甚至连处理这些 action 的 reducer 都不用写，你只需要把异步以 Promise 的形式传给 redux-amrc 就行了。没有 action，没有 reducer，只需要编写一个 action 创建函数并发起它就可以了！就是这么清爽！

```js
import fetch from 'isomorphic-fetch';
import { ASYNC } from 'redux-amrc';

export function load() {
  return {
    [ASYNC]: {
      key: 'counter',
      promise: () => fetch('http://localhost:3000/api/counter')
        .then(response => response.json())
    }
  };
}
```

另外，附一张使用 redux-amrc 的程序截图，看到 async 那颗树了吗，就是这个插件自动帮你构建的，你可以获取 `value`、`error`、`loading`、`loaded`、`loadingNumber`，应有尽有，而且全自动生成！

![](http://ww1.sinaimg.cn/large/83900b4egw1fabfc1z4kwj210s0nsaem.jpg)

---

<center>*2017-03-15更新*</center>

## Redux-amrc 中文文档

这个插件将会帮你用更少的代码发起异步 action。通过这个插件你将：

- 不需要再手动编写异步 action 对象。
- 不需要再手动编写 reducer 来处理异步 action 对象。
- 获取插件自动生成的 value、error、loaded、loading、loadingNumber 等多个异步状态。

## 安装

```sh
npm install redux-amrc --save
```

## 初级用法

该插件的初级用法只有三步：

第一步，将插件提供的 `asyncMiddleware` 连接到Redux的中间件列表上。

```js
import { asyncMiddleware } from 'redux-amrc';
	
applyMiddleware(thunk, asyncMiddleware)

```

第二步，将插件提供的 `reducerCreator` 安装到 Redux 的单一状态树的 `async` 节点上。

```js
import { combineReducers } from 'redux';
import { reducerCreator } from 'redux-amrc';

const rootReducer = combineReducers({
  async: reducerCreator()
});

export default rootReducer;
```

第三步，使用插件提供的 `ASYNC` 来标记 action 创建函数（以被中间件识别），并将异步以 Promise 的形式传递进这个 action 创建函数中。

```js
import { ASYNC } from 'redux-amrc';

/**
 * 这个action创建函数将会自动创建 LOAD 和 LOAD_SUCCESS 这两个 action,
 * state.async.[key] 将会变为 'success'
 */
function success() {
  return {
    [ASYNC]: {
      key: 'key',
      promise: () => Promise.resolve('success')
    }
  }
}

/**
 * 这个action创建函数将会自动创建 LOAD 和 LOAD_FAIL 这两个 action,
 * state.async.loadState.[key].error 将会变为 'fail'
 */
function fail() {
  return {
    [ASYNC]: {
      key: 'key',
      promise: () => Promise.reject('fail')
    }
  }
}
```

至此，异步的所有状态都将在你的掌控之中了，当异步 Promise 被执行，该插件会自动帮你发起这些 action：

* `LOAD`: 特定数据开始加载
* `LOAD_SUCCESS`: 数据加载成功
* `LOAD_FAIL`: 数据加载失败

你还可以从 Redux 单一状态树上获取你想要的异步状态，这些状态都是该插件给你自动生成的：

* `state.async.[key]`: Promise 成功时返回的数据
* `state.async.loadState.[key].loading`: 特定 key 的数据是否正在加载
* `state.async.loadState.[key].loaded`: 特定 key 的数据是否加载完成
* `state.async.loadState.[key].error`: Promise 出错时返回的错误信息
* `state.async.loadingNumber`: 当前有多少异步正在加载

## 高级用法

如果 Redux 单一状态树上某个节点的数据已经存在，你不想重复加载，你可以使用 `once` 选项，这会帮你减少异步请求，从而节约开销，提升性能。

```js
function loadData() {
  return {
    [ASYNC]: {
      key: 'data',
      promise: () => fetch('/api/data')
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
      once: true
    }
  };
}
```
 
如果你想使用自己编写的 reducer 更新该插件某个节点上的数据，比如 `state.async.[key]` 。那么你可以在插件的 `reducerCreator` 方法上添加你的 reducers。其实 `reducerCreator` 的用法和 Redux 的 `combineReducers` 是一样的，都是接受多个 reducer 组成的对象。

```js
// 你自己的 action 类型
const TOGGLE = 'TOGGLE';

// 你自己的 reducer
function keyReducer(state, action) {
  switch (action.type) {
    case TOGGLE:
      return state === 'success' ? 'fail' : 'success';
    default:
      return state
  }

}

// 添加 reducers 到 reducerCreator 上
const rootReducer = combineReducers({
  async: reducerCreator({
    key: keyReducer
  })
});

// 发起这个 action 将会更新 `state.async.key` 上的数据
dispatch({ type: TOGGLE }); 
```

## API

* `asyncMiddleware`: 一个 Redux 中间件

* `[ASYNC]`
	* `key`: 一个字符串
	* `promise(store)`: 一个返回Promise的函数
	
		* `store`(可选参数): Redux中的store对象
		
	* `once`: 布尔类型
	
* `reducerCreator(reducers)`: 返回 Reducer 的函数
	* `reducers`(可选参数): 多个reducer组成的对象
    
    
## 例子

[基本例子](https://github.com/lewis617/redux-amrc/tree/master/examples/01-basic)：一个最小的 Node 脚本，演示该插件的基本用法。`npm start` 运行该程序后，观察命令行的输出，可以看到该插件帮你自动发起的 action 和相关的状态变化。

[与React、Fetch搭配使用](https://github.com/lewis617/redux-amrc/tree/master/examples/02-use-with-fetch)：一个简单的用户界面，点击 load 按钮，该插件会帮你获取“网络请求是否正在加载”、“网络请求是否加载完成”、“网络请求得到的数据是什么”等多个异步状态。该例子的运行方法同样是 `npm start`。

## Star、Issue 与 Pull Request

如果您觉得该插件不错，就用 [star](https://github.com/lewis617/redux-amrc) 支持一下吧！

如果您在使用该插件时遇到问题，请提交 [Issue](https://github.com/lewis617/redux-amrc/issues)，我会第一时间解答您的疑问。

如果您发现该插件的源码、测试、文档、例子等任何方面有不足之处，欢迎 [pull request](https://github.com/lewis617/redux-amrc/pulls)。
