
---
title: react+redux教程（六）redux服务端渲染流程
date: 2016-02-01 03:20:00
tags: [React, Redux]
---

今天，我们要讲解的是react+redux服务端渲染。个人认为，react击败angular的真正"杀手锏"就是服务端渲染。我们为什么要实现服务端渲染，主要是为了SEO。

# 例子

![](http://images2015.cnblogs.com/blog/814069/201601/814069-20160120134123062-158958063.gif)

例子仍然是官方的计数器例子，不过我们实现了服务端渲染和state预加载。

源代码：

<https://github.com/lewis617/react-redux-tutorial/tree/master/redux-
examples/universal>

# 虚拟API

首先，我们要模拟一个api，用于异步请求数据。代码如下：

common/api/counter.js

    
    
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    }
    
    export function fetchCounter(callback) {
      // Rather than immediately returning, we delay our code with a timeout to simulate asynchronous behavior
      setTimeout(() => {
        callback(getRandomInt(1, 100))
      }, 500)
    
      // In the case of a real world API call, you'll normally run into a Promise like this:
      // API.getUser().then(user => callback(user))
    }

# 服务端请求api，发送html串和state

server/server.js（部分代码）

    
    
    // This is fired every time the server side receives a request
    app.use(handleRender)
    
    function handleRender(req, res) {
      // Query our mock API asynchronously
      fetchCounter(apiResult => {
        // Read the counter from the request, if provided
        const params = qs.parse(req.query)
        const counter = parseInt(params.counter, 10) || apiResult || 0
    
        // Compile an initial state
        const initialState = { counter }
    
        // Create a new Redux store instance
        const store = configureStore(initialState)
    
        // Render the component to a string
        const html = renderToString(
          <Provider store={store}>
            <App />
          </Provider>
        )
    
        // Grab the initial state from our Redux store
        const finalState = store.getState()
    
        // Send the rendered page back to the client
        res.send(renderFullPage(html, finalState))
      })
    }
    
    function renderFullPage(html, initialState) {
      return `
        <!doctype html>
        <html>
          <head>
            <title>Redux Universal Example</title>
          </head>
          <body>
            <div id="app">${html}</div>
            <script>
              window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
            </script>
            <script src="/static/bundle.js"></script>
          </body>
        </html>
        `
    }

  1. api写好了，我们调用了这个api，即fetchCounter，这个api函数也会产生一个回调，我们在回调中获取counter值
  2. 如果中间件请求中有参数，则const params = qs.parse(req.query)，counter为parseInt(params.counter, 10)。否则counter为api的回调中返回的值apiResult，如果前两个都没有则为0。qs用于解析http请求中的querystring，就是？param=sth。
  3. 得到counter，我们就得到了state，用state作为参数，重新生成一个store实例，每次都要重新生成一个新的store实例。然后用react的服务端渲染生成一个html串，把它发送出去
  4. 同时，我们还要发送一个const finalState = store.getState()出去，让客户端拿到这个state渲染，为什么？因为要保证客户端和服务端渲染的组件一样。

# "提了裤子不认人"的服务端渲染

既然有了服务端渲染，为何还要用客户端渲染，因为服务端渲染是"提了裤子不认人"，渲染完，我们的程序就不会动了（因为是一堆字符串）,客户端则可以让程序继续动起来，因为客户端有js，可以调用方法重绘浏览器界面。

# 客户端拿到state再渲染一次

既然要再渲染一次，为何还要服务端渲染？为了seo，我们的服务端渲染不只是给用户看的，主要是给那些"低能"的网络爬虫看的。

好吧，忍忍火，我们继续工作，客户端再渲染一次。

    
    
    const initialState = window.__INITIAL_STATE__
    const store = configureStore(initialState)
    const rootElement = document.getElementById('app')
    
    render(
      <Provider store={store}>
        <App/>
      </Provider>,
      rootElement
    )

其实客户端渲染也就拿到个初始state，然后render而已，没有很多代码。

我们的state是从window.__INITIAL_STATE__获取的，因为服务端把要给客户端的state放在了这个全局变量上面。

# "玄乎"的预载state

预载state，说得这么"玄乎"，好像很高大上，其实就是把state在服务器那边就生成好，然后传过来直接给客户端用。没有那么"玄乎"。

* * *

# 教程源代码及目录

如果您觉得本博客教程帮到了您，就赏颗星吧！

<https://github.com/lewis617/react-redux-tutorial>



