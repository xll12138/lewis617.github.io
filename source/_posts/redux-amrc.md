---
title: 用更少的代码发起异步action
date: 2016-12-1 04:18:00
tags: [Redux, redux-amrc]
---

很多人说 Redux 代码多，开发效率低。其实 Redux 是可以灵活使用以及拓展的，经过充分定制的 Redux 其实写不了几行代码。今天先介绍一个很好用的 Redux 拓展—— [redux-amrc](https://github.com/lewis617/redux-amrc)。它可以帮助我们使用更少的样板代码发起异步action。

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

使用了 redux-amrc 后，再也不用写这么多action了，甚至连处理这些action的reducer 都不用写，你只需要把异步以 Promise 的形式传给 redux-amrc 就行了：

```js
import { ASYNC } from 'redux-amrc';

/**
 * 这个action创建函数可以帮你自动发起 LOAD 和 LOAD_SUCCESS,
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
 * 这个action创建函数可以帮你自动发起 LOAD 和 LOAD_FAIL,
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

没有 action，没有 reducer，就是这么简单！当然，在享受这一切之前，你需要进行简单的配置。更详细的用法，请参考redux-amrc的文档（https://lewis617.github.io/redux-amrc/）。

另外，附一张使用 redux-amrc 的程序截图，那些 LOAD、LOAD_SUCCESS、LOAD_FAIL 就是 redux-amrc 帮你自动生成的！

![](http://ww1.sinaimg.cn/large/83900b4egw1fabfc1z4kwj210s0nsaem.jpg)
