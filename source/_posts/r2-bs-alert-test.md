---
title: 使用 React、Redux 和 Bootstrap 实现 Alert（测试篇）
date: 2016-11-18 02:56:00
tags: [React, Redux, Bootstrap, 测试]
---

上节课我们学习了如何 [使用 React、Redux 和 Bootstrap 实现 Alert](https://lewis617.github.io/2016/11/16/r2-bs-alert/) 。今天，我们学习如何测试它们！

<!--more-->

## 例子

这个例子实现了弹出不同类型信息的功能，这些信息默认会在5秒后消失，你也可以手动点击使其消失。如果你在服务端有信息要提示，还可以通过 Redux 的单一数据源传到客户端在渲染页面时显示出来。

![](https://raw.githubusercontent.com/lewis617/react-redux-tutorial/master/r2-bs-alert/public/r2-bs-alert.gif)

源代码：

https://github.com/lewis617/react-redux-tutorial/tree/master/r2-bs-alert

安装：

```sh
npm i
```

开发环境下运行：

```sh
npm start
```

生产环境下构建：

```sh
npm run build
```

测试：

```sh
npm test
```

## 工具

由于 create-react-app 已经帮我们集成了 [Jest](https://facebook.github.io/jest/) 作为测试运行器，甚至还帮我们默认添加了 [jsdom](https://github.com/tmpvar/jsdom)，用于模拟浏览器环境，因此我们只需要再添加很少一部分测试工具，就可以开始测试了！本例添加的测试工具包括：

 - redux-mock-store：帮我们模拟 redux 的 store，方便我们测试 action creator。
 - enzyme：Airbnb的测试工具，用于测试 React 组件。

它们的详细用法，可以参考相应的官网文档。

## 测试 Redux

测试 Redux 包括：

 - 测试 action creator
 - 测试 reducer

下面两节，我们分开讲解它们的测试方法。

### 测试 action creator

测试未经中间件加工的 action creator 还是比较简单的。它们的测试方法是直接使用断言判断这些 action creator 的返回值即可。

如果使用了中间件，就比较麻烦了，因为中间件加工了 `dispatch`，action creator 的执行过程会变得复杂。但所幸有工具可以帮我们模拟这个过程，进而降低测试 action creator 的难度，这个工具就是 redux-mock-store。我们应该先用 redux-mock-store 模拟一个 store，然后连入需要的中间件（本例是 thunk ），最后使用不同的 initial state 作为前提条件，来测试 action creator。

src/alert/\__tests__/redux.test.js

```js
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import reducer, { ALERT_SHOW, ALERT_HIDE, alertShow, alertHide, alertMessage, hideAllAlert } from '../redux';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('action test', () => {
  it('alertShow should create ALERT_SHOW', () => {
    expect(alertShow('message', 'success', 0))
      .toEqual({
        payload: {
          messageText: 'message',
          messageType: 'success',
          key: 0
        },
        type: ALERT_SHOW
      });
  });
  it('alertHide should create ALERT_HIDE', () => {
    expect(alertHide(0))
      .toEqual({
        payload: {
          key: 0
        },
        type: ALERT_HIDE
      });
  });
  it('alertMessage should create ALERT_SHOW and create ALERT_HIDE after delay', (done) => {
    const expectedActions = [
      alertShow('message', 'success', 1)
    ];
    const getState = { alerts: { lastKey: 0, items: [] } };
    const store = mockStore(getState);
    store.dispatch(alertMessage('message', 'success', 0));
    expect(store.getActions()).toEqual(expectedActions);
    setTimeout(() => {
      expect(store.getActions()).toEqual(expectedActions.concat([alertHide(1)]));
      done();
    }, 0);
  });
  it('hideAllAlert should create multi ALERT_HIDE after delay', (done) => {
    const expectedActions = [
      alertHide(0),
      alertHide(1)
    ];
    const getState = { alerts: { lastKey: 1, items: [{ key: 0 }, { key: 1 }] } };
    const store = mockStore(getState);
    store.dispatch(hideAllAlert(0));
    setTimeout(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    }, 0);
  });
});

```
### 测试 reducer

由于 reducer 是纯函数，所以测试起来非常简单，直接使用断言判断输入输出即可。

src/alert/\__tests__/redux.test.js

```js
import reducer from '../redux';

describe('reducer test', () => {
  it('should handle alertShow action', () => {
    expect(reducer({ items: [], lastKey: -1 }, alertShow('message', 'success', 0))).toEqual({
      items: [{
        messageText: 'message',
        messageType: 'success',
        key: 0
      }],
      lastKey: 0
    });
  });
  it('should handle alertHide action', () => {
    expect(reducer({
      items: [{ messageText: 'message', messageType: 'success', key: 0 }],
      lastKey: 0
    }, alertHide(0))).toEqual({ items: [], lastKey: 0 });
  });
  it('should handle unknown action', () => {
    expect(reducer([], { type: 'unknown' })).toEqual([]);
  });
});

```

## 测试 React 组件

测试 React 组件主要包括：

 - 测试 React 组件的渲染结果
 - 模拟用户行为，测试 React 组件的反应变化

为此，我们需要使用工具将组件渲染出来，然后这个工具还得能模拟用户行为。enzyme 就是专门为此设计的测试工具。下面，我们将会使用它来测试 React 组件。

本例的 React 组件是一个 AlertList，它有两个功能：

 1. 渲染 Alert 后，延迟几秒消失
 2. 点击每个 Alert，会使其消失

因此，我们的测试应该这么写：

 1. 创建 store，并使用 Provider 包括被测试的组件，然后使用 mount 渲染它。
 2. 从渲染后的结果中提取需要测试的部分。
 3. 根据 AlertList 的两个功能编写测试用例。

> `mount` 是 enzyme 提供的深度渲染的函数。“深度渲染”是指渲染出完整的DOM的方法，它是相对于“浅渲染”的一个概念，关于“深度渲染”和“浅渲染”的更多的细节请参考 enzyme 的官网文档。

另外，由于我们测试逻辑中包含一个5000ms的异步过程，因此，编写测试用例前，需要将超时时间设置为大于5000ms的值 ，否则我们的测试程序将会显示超时错误。

测试代码清单：

src/alert/\__tests__/AlertList.test.js

```js
import React from 'react';
import { mount } from 'enzyme';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AlertList, reducer } from '../index';

function setup(state = {}) {
  const store = createStore(
    combineReducers({ alerts: reducer }),
    state,
    applyMiddleware(thunk)
  );
  const app = mount(
    <Provider store={store}>
      <AlertList />
    </Provider>
  );
  return {
    app,
    store
  };
}

describe('AlertList', () => {
  let originalTimeout;
  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
  it('should display messages and hide all after delay', () => {
    const { app } = setup({ alerts: { lastKey: 1, items: [{ key: 0 }, { key: 1 }] } });
    expect(app.find('.alert').length).toBe(2);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 5000)
    }).then(() => {
      expect(app.find('.alert').length).toBe(0);
    });
  });

  it('should display messages and hide itself after clicked', () => {
    const { app } = setup({
      alerts: {
        lastKey: 1,
        items: [{ key: 0, messageText: 'messageText1' }, { key: 1, messageText: 'messageText2' }]
      }
    });
    app.find('.alert').at(1).find('button').at(0)
      .simulate('click');
    expect(app.find('.alert').text()).not.toMatch(/messageText2/);
    expect(app.find('.alert').text()).toMatch(/messageText1/);
  });
});

```

至此，我们的测试就写完了！

## 写在最后

很多新手开发者不愿意写测试，对此，我的建议是：

> 如果你不想写测试，那就不要逼自己学习测试。等你被无聊反复的手动测试折磨到忍无可忍，或着，等你觉得运行一个小型的独立功能模块却要非常麻烦的时候，你自然就愿意学了！

## 教程源代码及目录

[https://github.com/lewis617/react-redux-tutorial](https://github.com/lewis617/react-redux-tutorial)
