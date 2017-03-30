---
title: Preact 源码剖析（一）解读 package.json
date: 2017-03-29 14:51:00
tags: [Preact, 源码剖析, rimraf, copyfiles, npm-run-all, rollup, uglifyjs, jscodeshift, gzip-size-cli, Mocha, Karma, ESLint, TypeScript, Git, Greenkeeper]
---

今天，我们来看看 Preact 这个轮子的整体架构。

<!--more-->

## Preact 简介

Preact 是 React 的 3kb 轻量化方案，具有同样的 ES6 接口。Preact 有以下几个特点：

- 更接近于实质
- 小体积
- 高性能
- 轻量 & 移植
- 即时生产
- 生态系统兼容

关于上述特点的具体介绍可以查看官网（https://preactjs.com/） 。目前为止（2017-03-29），Preact 已经有8308颗 star 了。既然 Preact 这么火，在不失去虚拟 DOM 等优秀特性的同时，还比 React 更轻量，那就让我们来学习一下它的源码吧！在开始之前，希望你应该：

- 使用过 Preact 或 React
- 看过 Preact 的使用文档
- 有过阅读其他轮子源码的经验

如果你满足上面三条，那么就继续往下阅读吧！否则，对你来说这篇博文可能读起来比较吃力。

## 从 package.json 开始

打开 Preact 的 GitHub 地址（https://github.com/developit/preact/） ，我们可以看到它的源码并不算太少，那我们应该从哪开始看呢？每个人都有自己的阅读源码的习惯，我个人喜欢从 package.json 文件开始，因为这个文件包含了整个项目的名称、描述、各个命令、入口、依赖等诸多信息，看完 package.json 就可以对该项目的整体架构有所了解了。


## 项目名称、版本、描述和入口

打开 package.json ，先看这几个字段：

```js
"name": "preact",
"amdName": "preact",
"version": "7.2.0",
"description": "Tiny & fast Component-based virtual DOM framework.",
"main": "dist/preact.js",
"jsnext:main": "src/preact.js",
"aliases:main": "aliases.js",
"dev:main": "dist/preact.dev.js",
"minified:main": "dist/preact.min.js",
```
下面我们来逐个解释一下：

- `name`：项目名称。
- `amdName`：现在已经废弃：https://github.com/developit/preact/issues/613 。
- `version`：项目版本。
- `description`：项目描述。
- `main`：指定了加载的入口文件，`require('preact')` 就会加载这个文件。这个字段的默认值是模块根目录下面的 index.js。
- `jsnext:main`： ES modules 格式的入口文件。
- `aliases:main`：别名入口文件，不属于 package.json 的常用字段，应该是为了配合 Webpack 等打包工具而自定义的字段。后面的 `dev:main` 和 `minified:main` 也是如此。
- `dev:main`：开发环境下的入口文件。
- `minified:main`：压缩后的入口文件。

## 各个命令

接下来我们来看 `scripts` 字段中的各个命令：

```js
"scripts": {
  ...
},
```

我们来逐条分析：

1，`clean` 命令使用了 `rimraf` 工具（https://www.npmjs.com/package/rimraf） 模拟 `rm -rf` 命令来删除一些目录和文件。

```js
"clean": "rimraf dist/ aliases.js aliases.js.map  devtools.js devtools.js.map",
```

2，`copy-flow-definition` 命令使用了 `copyfiles` 工具（https://www.npmjs.com/package/copyfiles） 复制 flow 定义文件 src/preact.js.flow 到 dist 目录。什么是 flow 定义文件？它有啥作用？具体请看这里：https://flow.org/en/docs/libdefs/ 。

```js
"copy-flow-definition": "copyfiles -f src/preact.js.flow dist",
```

3，`copy-typescript-definition` 命令使用了 `copyfiles` 工具复制 ts 定义文件 src/preact.d.ts 到 dist 目录。什么是 TypeScript 定义文件？它有啥作用？具体请看这里：https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html 。

```js
"copy-typescript-definition": "copyfiles -f src/preact.d.ts dist",
```
4，`build` 命令使用 `npm-run-all` 工具（https://www.npmjs.com/package/npm-run-all） 依次执行了这些命令 `clean transpile copy-flow-definition copy-typescript-definition strip optimize minify size`。这些命令我们马上就会介绍。

```js
"build": "npm-run-all --silent clean transpile copy-flow-definition copy-typescript-definition strip optimize minify size",
```
5，`transpile:main` 命令使用 `rollup` 工具（https://rollupjs.org/） 进行对 src/preact.js 进行打包编译。关于 `rollup` ，这里不详述，可自行参阅官网文档，后续我也可能会写一些关于它的博文，毕竟这也是个拥有八千多 star 的新秀。

```js
"transpile:main": "rollup -c config/rollup.config.js -m dist/preact.dev.js.map -f umd -n preact src/preact.js -o dist/preact.dev.js",
```

6，`transpile:devtools` 命令使用 `rollup` 工具进行对 devtools/index.js 进行打包编译。

```js
"transpile:devtools": "rollup -c config/rollup.config.devtools.js -o devtools.js -m devtools.js.map",
```

7，`transpile:aliases` 命令使用 `rollup` 工具进行对 src/preact.js 进行打包编译。注意，preact 经常要和 react 混用，所以这里提供了定制别名的功能。

```js
"transpile:devtools": "rollup -c config/rollup.config.devtools.js -o devtools.js -m devtools.js.map",
```

8，`transpile` 命令依次执行了上述三条命令。

```js
"transpile": "npm-run-all transpile:main transpile:aliases transpile:devtools",
```

9，`optimize` 命令使用 `uglifyjs` 工具（https://www.npmjs.com/package/uglify-js） 对代码进行了优化。

```js
"optimize": "uglifyjs dist/preact.dev.js -c conditionals=false,sequences=false,loops=false,join_vars=false,collapse_vars=false --pure-funcs=Object.defineProperty -b width=120,quote_style=3 -o dist/preact.js -p relative --in-source-map dist/preact.dev.js.map --source-map dist/preact.js.map",
```

10，`minify` 命令使用 `uglifyjs` 工具对代码进行了压缩。

```js
"minify": "uglifyjs dist/preact.js -c collapse_vars,evaluate,screw_ie8,unsafe,loops=false,keep_fargs=false,pure_getters,unused,dead_code -m -o dist/preact.min.js -p relative --in-source-map dist/preact.js.map --source-map dist/preact.min.js.map",
```

11，`strip` 命令使用 `jscodeshift` 工具（https://github.com/facebook/jscodeshift） 对代码进行了重构。重构规则请看 config/codemod-strip-tdz.js 和 config/codemod-const.js。

```js
"strip": "jscodeshift --run-in-band -s -t config/codemod-strip-tdz.js dist/preact.dev.js && jscodeshift --run-in-band -s -t config/codemod-const.js dist/preact.dev.js",
```

12，`size` 命令使用 `gzip-size-cli` 工具（https://www.npmjs.com/package/gzip-size-cli） 输出了代码的 gzip 大小。

```js
"strip": "jscodeshift --run-in-band -s -t config/codemod-strip-tdz.js dist/preact.dev.js && jscodeshift --run-in-band -s -t config/codemod-const.js dist/preact.dev.js",
```

13，`test` 命令并行执行了 `test:mocha` 和 `test:karma` 两条命令。

```js
"test": "npm-run-all lint --parallel test:mocha test:karma",
```

14，`test:mocha` 命令使用 `mocha` 对在 Node 上运行的代码进行单元测试。

```js
"test:mocha": "mocha --recursive --compilers js:babel/register test/shared test/node",
```

15，`test:karma` 使用 `karma` 对代码在不同浏览器中进行测试。

```js
"test:karma": "karma start test/karma.conf.js --single-run",
```

16，`test:mocha:watch` 使用 watch 模式运行 `test:mocha` 命令。

```js
"test:mocha:watch": "npm run test:mocha -- --watch",
```

17，`test:karma:watch` 使用 watch 模式运行 `test:karma` 命令。

```js
"test:karma:watch": "npm run test:karma -- no-single-run",
```

18，`lint` 命令使用 `eslint` 工具对代码进行语法检查。

```js
"lint": "eslint devtools src test",
```

19，`prepublish` 命令在 `npm publish` 命令前自动执行。

```js
"prepublish": "npm run build",
```

20，`smart-release` 命令依次执行了：

- `npm run build`：对代码进行构建。
- `npm test`：测试代码。
- `git commit -am $npm_package_version`：提交代码，信息为版本号。`-am` 的意思是添加变化代码（`-a`），然后附带信息（`-m`）提交。
- `git tag $npm_package_version`：新建一个tag在当前 commit。
- `git push`：推送到 Git 服务器。
- `git push tags`：提交所有 tag。
- `npm publish`：发布到 npm 仓库。

```js
"smart-release": "npm run build && npm test && git commit -am $npm_package_version && git tag $npm_package_version && git push && git push --tags && npm publish",
```

## ESLint 配置文件和 TypeScript 定义文件

接着往下看：

```js
"eslintConfig": {
 "extends": "./config/eslint-config.js"
},
"typings": "./dist/preact.d.ts",
```
定义了 ESLint 配置文件和 TypeScript 定义文件。

## 仓库、文件、关键词、作者、协议、Bugs 和主页

然后是仓库、文件、关键词、作者、协议、Bugs 和主页：

```js
"repository": {
  "type": "git",
  "url": "https://github.com/developit/preact.git"
},
"files": [
  "devtools",
  "src",
  "dist",
  "aliases.js",
  "aliases.js.map",
  "devtools.js",
  "devtools.js.map",
  "typings.json"
],
"keywords": [
  "preact",
  "react",
  "virtual dom",
  "vdom",
  "components",
  "virtual",
  "dom"
],
"author": "Jason Miller <jason@developit.ca>",
"license": "MIT",
"bugs": {
  "url": "https://github.com/developit/preact/issues"
},
"homepage": "https://github.com/developit/preact",
```

## 开发依赖

Preact 没有依赖，但有开发时的依赖：

```js
"devDependencies": {
    ...
  },
```

## Greenkeeper 配置

Greenkeeper （https://greenkeeper.io/） 是一个工具，它可以通过实时监测和自动更新来帮你的项目获取安全性和一致性。最后是 Greenkeeper 的定义：

```js
"greenkeeper": {
  "ignore": [
    "rollup-plugin-babel",
    "babel",
    "babel-core",
    "babel-eslint",
    "babel-loader",
    "babel-runtime",
    "jscodeshift"
  ]
}
```

## 总结

通过上面的分析，我们知道了这个项目的一些信息，包括入口，目录安排、项目构建技术等。如果你对上面提到的技术不太熟悉，那么应该去参阅它们的官网文档，并尝试在自己的项目中使用它们，这也是我们剖析源码的意义所在。

## 博客源代码及目录

https://github.com/lewis617/preact-analysis