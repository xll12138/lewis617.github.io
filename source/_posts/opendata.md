---
title: React 与 Redux 在生产环境中的实践总结
date: 2016-11-26 14:36:00
tags: [React, Redux, 大型项目, Universal] 
---

前段时间使用 React 与 Redux 重构了我们360网络安全研究院的 [开放数据平台](http://data.netlab.360.com/)。现将其中一些技术实践经验总结如下：

## Universal 渲染

Universal （“同构”现在是公认的不准确的叫法）渲染是指在服务端与客户端使用一套代码进行渲染的技术。它所带来的优势如下：

 1. 与实现服务端渲染的传统应用相比，Universal 渲染中的客户端渲染减少了网络请求（主要是模板和静态资源的请求），提高了页面间切换的速度，可以看到页面之间的切换都是瞬间完成的。
 2. 与实现客户端渲染的传统 SPA（比如 Angular1.x 搭建的单页面应用）相比，Universal 渲染的服务端渲染提升了首屏加载速度，无须等待庞大的 Javascript 脚本加载完成后进行渲染，因此也无须使用欢迎界面了。
 3. 与使用不同语言实现服务端渲染＋客户端渲染的应用（指的是后端语言为 Java、Python、PHP、前端语言为 JavaScript 的应用）相比，由于 Universal 渲染使用同一套代码（前后端均为 JavaScript），因此至少减少了一半的代码量。

Universal 渲染非常复杂，需要权衡的东西很多。不过这都是值得的，真正让网站达到了快如鬼魅的速度！顺便引用一句话：

>  According to research at Google, the difference of just 200 milliseconds in page load performance has an impact on user behavior. 
> 
> 根据 Google 的调查，在一个页面的加载过程中，仅仅200毫秒的差异就可以影响用户的行为。

## 延迟渲染

很多人抱怨 React 并没有大家说的那么快，其实 React 只是便于优化性能，在没有经验的新手手中，React确实可能会很慢。但如果你对 React 非常了解，那么快如鬼魅便不是虚言。React 性能优化的方法很多，网上也有无数的文章对其进行介绍（选择React的另一好处：活跃的社区），常见的方法主要是，使用不可变数据，快速进行变更检查，以避免不必要的重新渲染。但我们还要介绍一种方法——延迟渲染。

延迟渲染类似与分页或瀑布流，就是在一个有大量数据页面中，先渲染一部分，等用户滚动下去后，再进行渲染。

延迟渲染除了可以提升性能之外，还可以过滤掉不需要在服务端渲染的代码（服务端可没有re-render），以减少 Universal 的难度。

延迟渲染的方法很多，实现的轮子也很多，不再赘述了。

## 减小重量

在 React 与 Redux 的项目中，不可避免要引入一些第三方的库，因此最终打包的脚本重量很容易达到 500-800kb 以上（gzip 压缩前）。尽管首屏渲染速度不会受此影响（因为我们实现了 Universal 渲染中的服务端渲染，而浏览器又是自上而下解析的），但我们依然希望这个脚本的重量能够更小。现将一些可行的办法列举如下：

### 改变库的调用方式

写过NPM的包的同学很清楚，一个包通常会有一个入口文件，我们将所有的模块都放在这个入口文件中，以便其他开发者调用。但是如果仅仅只用了一个包中很少一个模块，那么从入口文件调用就会导致增加了很多多余的模块。为此，我们应该改变一些库的调用方式，来避免这种情况，比如：

React Bootstrap 应该这么调用：

```js
import IndexLink from 'react-router/lib/IndexLink';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
```

不应该这么调用：

```js
import { IndexLink, Navbar, Nav, NavItem }from 'react-router';
```
React Router 应该这么调用：

```js
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
```
不应该这么调用：

```js
import { Route, IndexRoute } from 'react-router/lib/Route';
```

这种改进方式所带来的效果非常明显，至少能减少100kb的重量。


除此之外，Bootstrap的样式文件也应该进行自定义，并去除一些不用的模块。最终我们项目中所有的样式文件合并后也只有22kb（gzip 压缩后）。

### 代码分割

使用 webpack 1.x 的 require.ensure 可以轻易实现代码分割。分割的对象主要有俩个：

 1. 路由组件 
 2. 只在个别页面使用的大型第三方库

路由组件的分割意义不大，因为我们写的代码几乎很少（这也正是使用库和框架的意义），即便按需加载，也不会带来太多的提升。而且，原本打包成一个文件，可以进行代码去重，但分割后就无法实现这个功能了（当然，如果你将公共库提取出来了，这个问题就不存在了）。不过，如果你的项目非常庞大，也可以试试。

分割只在个别页面使用的大型第三方库是有意义的。比如，我们项目中一些页面使用了很重的 Highcharts，但也有很多页面不需要它，如果不对其进行代码分割，就会连累不使用 Highcharts 的页面。所以应该对只在个别页面使用的大型第三方库进行分割。方法如下：

将这些库使用 require.ensure 封装成 Promise：
```js
export const loadHighcharts = () => new Promise((resolve)=> {
  require.ensure([], (require)=> {
    if (!window.Highcharts) {
      window.Highcharts = require('highcharts');
    }
    resolve(window.Highcharts);
  }, 'highcharts');
});
```

然后，在组件中调用：

```js
import React, { Component, PropTypes } from 'react';
import { loadHighcharts } from '../Map/load';
import theme from './primary';

class Chart extends Component {
  componentDidMount() {
    loadHighcharts()
      .then(Highcharts => {
        ...
        this.chart = Highcharts.chart(this.container, config);
      });

  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return (
      <div
        ref={(c) => {
          this.container = c;
        }}
        style={{
          height: 400,
          minWidth: 310,
          margin: '0 auto',
          textAlign:'center'
        }}
      >
        <i className="fa fa-spinner fa-spin fa-2x fa-fw"/>
      </div>
    );
  }
}

Chart.propTypes = {
  type: PropTypes.string,
  data: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  yTitle: PropTypes.string.isRequired,
  step: PropTypes.number,
  offset: PropTypes.number,
};

export default Chart;

```

### 启用 gzip 压缩

启用 gzip 压缩的效果更加明显，往往能减少 70% 的重量，最终我们项目的代码重量一共只有130kb（包含了React Bootstrap、React Rouer、Highcharts在内的N多重量级第三方库，另外还有所有的页面代码在里面）。这个方法比较常见，不再赘述。

减小重量的方法就先聊到这吧！

## 使用更少的样板代码发起异步action

很多人说 Redux 代码多，开发效率低。其实 Redux 是可以灵活使用以及拓展的，经过充分定制的 Redux 其实写不了几行代码。今天先介绍一个很好用的 Redux 拓展—— [redux-amrc](https://github.com/lewis617/redux-amrc)。它可以帮助我们使用更少的样板代码发起异步action。

一般情况下，为了清楚地记录异步的过程，我们需要使用 三个 action 来记录状态变化。通常，我们的代码会是这样：

```js
export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'
```

使用了 redux-amrc 后，再也不用写这么多action了，甚至连处理这些action的reducer都不用写，你只需要把异步以Promise的形式传给 redux-amrc就行了：

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
更多的使用方法，请参考[官网文档](https://lewis617.github.io/redux-amrc/)。

## 与 传统的DOM操作相结合

React 强调声明式构建用户界面，但在一些情况下，往往还是操作 DOM 来得快。事实上，在 React 中操作 DOM 也很方便。现将一些场景列举如下：

### 使用Canvas

有时候我们需要使用 Canvas 画个多边形什么的，尽管已经有很多封装 Canvas 的 React 库了，但命令式的 Canvas 画法也非常方便，可以直接在React 中使用：

比如，这么一个画多边形的方法：

```js
/**
 * 使用canvas画多边形
 * @param c：canvas context
 * @param n：多边形的边数
 * @param r：多边形的半径
 * @param color：线条颜色
 */
function drawHexagon(c, n, r, color) {
  const context = c;
  const x = context.canvas.width / 2;
  const y = context.canvas.height / 2;
  const ang = (Math.PI * 2) / n; // 旋转的角度
  context.save();// 保存状态
  context.fillStyle = 'transparent';// 填充颜色
  context.strokeStyle = color;// 填充线条颜色
  context.lineWidth = 1;// 设置线宽
  context.translate(x, y);// 原点移到x,y处，即要画的多边形中心
  context.moveTo(0, -r);// 据中心r距离处画点
  context.beginPath();
  context.rotate(ang / 2);// 旋转
  for (let i = 0; i < n; i += 1) {
    context.rotate(ang);// 旋转
    context.lineTo(0, -r);// 据中心r距离处连线
  }
  context.closePath();
  context.stroke();
  context.fill();
  context.restore();// 返回原始状态
}
```

可以这么在 React 中用：

```js
class Hexagon extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.array.isRequired
  };

  componentDidMount() {
    const context = this.canvas.getContext('2d');
    const sin60 = Math.sin(Math.PI / 3);
    drawHexagon(context, 6, 80 / sin60, '#D9DADB');
  }

  render() {
    return (
      <div>
        <canvas
          width="190px"
          height="170px"
          ref={(c) => {
            this.canvas = c;
          }}
        />
      </div>
    );
  }
}
```

其实任何基于 DOM 的操作方法都可以这么玩！你可以把 `componentDidMount()` 当成 jQuery 的 `$(document).ready()` 方法。

### 实现图表

无论你之前使用的是 D3 还是 Highcharts，几乎都是基于 DOM 来完成图表的绘制的，在 React 中，如果你不想使用一些封装好的库，也可以操作DOM，方法和在 React 组件中画 Canvas 一样：

 - 渲染一个div 
 - 使用 ref 属性获取DOM  
 - 操作DOM

需要注意的是，如果你的库不够智能，那么你需要在 React 组件 卸载时 销毁操作DOM 产生的对象，以防止内存泄露。

### 实现返回顶部

返回顶部这个功能也操作了 BOM 和 DOM，它与 React 的结合方法如下：

 - 使用 React 渲染一个 `a` 标签，并添加返回顶部的点击事件 
 - 在组件挂载和卸载时分别添加和移除 `window` 的 `scroll` 事件来显示或隐藏返回顶部的 `a` 标签

```js
import React, { Component } from 'react';

class ScrollLink extends Component {
  constructor() {
    super();
    this.state = { linkStyle: { display: 'none' } };
  }

  componentWillMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const top = window.pageYOffset || document.documentElement.scrollTop;
    this.setState({ linkStyle: { display: top > 100 ? 'block' : 'none' } });
  };

  scrollToTop = () => {
    const scrollTo = (element, to, duration) => {
      if (duration <= 0) return;
      const _element = element;
      const difference = to - _element.scrollTop;
      const perTick = (difference / duration) * 10;

      setTimeout(() => {
        _element.scrollTop += perTick;
        if (_element.scrollTop === to) return;
        scrollTo(_element, to, duration - 10);
      }, 10);
    };
    scrollTo(document.body, 0, 100);
  };

  render() {
    const styles = require('./index.scss');

    return (
      <a
        className={styles.scrollLink}
        onClick={this.scrollToTop}
        style={this.state.linkStyle}
      >
        <i className="glyphicon glyphicon-arrow-up"/>
      </a>
    );
  }
}

export default ScrollLink;

```

实践中的经验还有很多，比如测试中的一些技巧，不过就先介绍这些吧！
