!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/scripts/",t(t.s=2)}([function(e,t){e.exports=React},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),c=function(e){return e&&e.__esModule?e:{default:e}}(u),l={notification:{boxSizing:"border-box",transition:"all 0.5s",position:"absolute",padding:16,borderRadius:6,minWidth:140,top:22,backgroundColor:"white",boxShadow:"0 2px 8px rgba(0, 0, 0, .2)"}},f=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={show:!1},n}return i(t,u.Component),s(t,[{key:"componentDidMount",value:function(){var e=this;setTimeout(function(){e.setState({show:!0})},0),setTimeout(function(){e.setState({show:!1})},this.props.duration)}},{key:"render",value:function(){return c.default.createElement("div",{style:a({},l.notification,{right:this.state.show?40:"-100%"})},c.default.createElement("div",{style:{marginBottom:6,fontSize:14,color:"rgba(0, 0, 0, .85)"}},this.props.title),c.default.createElement("div",{style:{fontSize:12,color:"rgba(0, 0, 0, .65)"}},this.props.body))}}]),t}();t.default=f},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var o=r(n(0)),i=r(n(3)),a=r(n(4));n(9);var s=document.getElementById("disqus_proxy_thread"),u=document.getElementById("disqus-thread");s&&!u&&((u=document.createElement("div")).id="disqus_thread",s.parentNode.appendChild(u),i.default.render(o.default.createElement(a.default,null),s))},function(e,t){e.exports=ReactDOM},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function r(o,i){try{var a=t[o](i),s=a.value}catch(e){return void n(e)}if(!a.done)return Promise.resolve(s).then(function(e){r("next",e)},function(e){r("throw",e)});e(s)}return r("next")})}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),l=r(c),f=r(n(5)),d=function(e){function t(e){i(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={disqusLoaded:!1,isLoading:!0},n}return s(t,c.Component),u(t,[{key:"componentWillMount",value:function(){var e=o(regeneratorRuntime.mark(function e(){var t,n,r,o,i,a=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=fetch("https://disqus.com/next/config.json?timestamp="+ +new Date),n=new Promise(function(e){return setTimeout(function(){return e({status:600})},2e3)}),e.next=5,Promise.race([t,n]);case 5:200!==(r=e.sent).status&&(console.warn("pre-test loading failed, load disqus-proxy instead"),this.setState({isLoading:!1})),o=document.createElement("script"),i=window.disqusProxy.shortname,o.src="https://"+i+".disqus.com/embed.js",o.async=!0,o.setAttribute("data-timestamp",String(+new Date)),o.onload=function(){a.state.isLoading&&a.setState({isLoading:!1,disqusLoaded:!0})},o.onerror=function(){document.getElementById("disqus_thread").style.display="none",a.setState({isLoading:!1}),console.warn("Failed to load disqus. Load disqus-proxy instead.")},setTimeout(function(){a.state.disqusLoaded||(a.setState({isLoading:!1}),document.getElementById("disqus_thread").style.display="none")},3e3),document.body.appendChild(o),e.next=23;break;case 18:e.prev=18,e.t0=e.catch(0),console.warn(e.t0),this.setState({isLoading:!1}),document.getElementById("disqus_thread").style.display="none";case 23:case"end":return e.stop()}},e,this,[[0,18]])}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state,t=e.disqusLoaded;return e.isLoading?l.default.createElement("div",{className:"disqus-statement"},l.default.createElement("span",null,"正在尝试加载",l.default.createElement("a",{href:"https://disqus.com",rel:"noopener noreferrer",target:"_blank"}," disqus "),"评论系统……")):!t&&l.default.createElement(f.default,null)}}]),t}();t.default=d},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function r(o,i){try{var a=t[o](i),s=a.value}catch(e){return void n(e)}if(!a.done)return Promise.resolve(s).then(function(e){r("next",e)},function(e){r("throw",e)});e(s)}return r("next")})}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),l=r(c),f=r(n(6)),d=r(n(7)),p=r(n(1)),h=function(e){function t(e){i(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={comments:[],isFetchingComment:!0,notificationTitle:"",notificationBody:"",showNotification:!1},n}return s(t,c.Component),u(t,[{key:"componentWillMount",value:function(){var e=o(regeneratorRuntime.mark(function e(){var t,n,r,o,i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=window.disqusProxy.identifier,n="identifier="+encodeURIComponent(t),r="//"+window.disqusProxy.server+":"+window.disqusProxy.port.toString()+"/api/getComments",e.prev=3,e.next=6,fetch(r+"?"+n);case 6:return o=e.sent,e.next=9,o.json();case 9:i=e.sent,this.setState({isFetchingComment:!1}),0===i.code?this.setState({comments:i.response}):2!==i.code&&this.setState({notificationTitle:"评论获取错误",notificationBody:i.response,showNotification:!0}),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(3),this.setState({isFetchingComment:!1,notificationTitle:"评论获取错误",notificationBody:e.t0.message,showNotification:!0});case 17:case"end":return e.stop()}},e,this,[[3,14]])}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state,t=e.notificationTitle,n=e.notificationBody,r=e.showNotification,o=e.comments,i=e.isFetchingComment;return l.default.createElement("div",{className:"disqus-proxy"},l.default.createElement("div",{className:"disqus-statement"},"您的网络连接在连接",l.default.createElement("a",{href:"https://disqus.com"}," disqus.com "),"时出现问题, 已为你展示精简版评论系统"),l.default.createElement(f.default,null),r&&l.default.createElement(p.default,{title:t,body:n,duration:5e4}),l.default.createElement(d.default,{comments:o,isLoading:i}))}}]),t}();t.default=h},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function r(o,i){try{var a=t[o](i),s=a.value}catch(e){return void n(e)}if(!a.done)return Promise.resolve(s).then(function(e){r("next",e)},function(e){r("throw",e)});e(s)}return r("next")})}}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=n(0),d=r(f),p=r(n(1)),h={button:{transition:"all 0.4s",outline:"none",border:"none",color:"white",backgroundColor:"#42b983",cursor:"pointer"},label:{boxSizing:"border-box",display:"block",width:"220px",margin:"10px 0"},span:{display:"inline-block",width:"60px",fontSize:"12px"},input:{padding:"0 10px",boxSizing:"border-box",height:"22px",width:"160px",outline:"none",borderRadius:"4px"}},m=function(e){function t(e){a(this,t);var n=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleChange=function(e,t){var r;n.setState((r={},i(r,t,e.target.value),i(r,t+"Valid",!0),r))},n.commentMetaToggle=function(){n.setState({showCommentMeta:!n.state.showCommentMeta})},n.state={thread:null,message:"",authorName:"",authorEmail:"",authorNameValid:!0,authorEmailValid:!0,messageValid:!0,showCommentMeta:!1,disabled:!1,notificationTitle:"",notificationBody:"",showNotification:!1},n}return u(t,f.Component),l(t,[{key:"componentWillMount",value:function(){var e=o(regeneratorRuntime.mark(function e(){var t,n,r,o,i,a,s;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=window.disqusProxy.identifier,n="identifier="+encodeURIComponent(t),r="//"+window.disqusProxy.server+":"+window.disqusProxy.port.toString()+"/api/getThreads",e.next=5,fetch(r+"?"+n);case 5:return o=e.sent,e.next=8,o.json();case 8:0===(i=e.sent).code&&i.response.length?(a=i.response[0].id,this.setState({thread:a}),"string"==typeof(s=localStorage.getItem(a))&&this.setState({message:s})):"number"==typeof i.code&&this.setState({notificationTitle:"thread 获取错误",notificationBody:i.response,showNotification:!0});case 10:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"postComment",value:function(){var e=o(regeneratorRuntime.mark(function e(){var t,n,r,o,a=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(this.state.thread){e.next=2;break}return e.abrupt("return");case 2:if(this.setState({message:this.state.message.trim(),authorName:this.state.authorName.trim(),authorEmail:this.state.authorEmail.trim()}),t=function(){var e=!0;["message","authorName","authorEmail"].forEach(function(t){""===a.state[t]&&(e=!1,a.setState(i({},t+"Valid",!1)))});var t=a.state.authorEmail;return/^[-a-zA-Z0-9.]+@[-a-zA-Z0-9]+\.[-a-zA-Z0-9]+$/.test(t)||(e=!1,a.setState({authorEmailValid:!1})),e},n=t()){e.next=7;break}return e.abrupt("return",!1);case 7:return this.setState({disabled:!0}),localStorage.setItem(this.state.thread.toString(),this.state.message),r={thread:this.state.thread,author_name:this.state.authorName,author_email:this.state.authorEmail,message:this.state.message},o="//"+window.disqusProxy.server+":"+window.disqusProxy.port.toString()+"/api/createComment",e.abrupt("return",fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}));case 12:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"submit",value:function(){var e=o(regeneratorRuntime.mark(function e(){var t,n,r=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.state.disabled){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,this.postComment();case 4:if(t=e.sent){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,t.json();case 9:n=e.sent,this.setState({disabled:!1}),0===n.code?(localStorage.removeItem(this.state.thread),this.setState({message:"",authorName:"",authorEmail:"",showCommentMeta:!1,notificationTitle:"发表成功",notificationBody:"请等待审核",showNotification:!0}),setTimeout(function(){r.setState({showNotification:!1})},5e3)):"number"==typeof n.code&&(this.setState({notificationTitle:"发表失败",notificationBody:n.response,showNotification:!0}),setTimeout(function(){r.setState({showNotification:!1})},5e3));case 12:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return d.default.createElement("div",{style:{padding:"10px 20px",position:"relative",overflow:"hidden"}},d.default.createElement("div",{style:{height:"110px",position:"relative"}},d.default.createElement("div",{style:{position:"absolute",paddingTop:"6px"}},d.default.createElement("img",{src:blockies.create({seed:"newuser",color:"yellow",bgcolor:"green",spotcolor:"red"}).toDataURL(),alt:"avatar",style:{width:"50px",height:"50px",borderRadius:"50%",boxShadow:"1px 1px 3px 0.5px #ccc"}})),d.default.createElement("textarea",{value:this.state.message,style:{position:"absolute",top:"0",left:"70px",width:"calc(100% - 70px)",height:"100px",boxSizing:"border-box",fontSize:"16px",letterSpacing:"0.7px",padding:"12px",color:"#555",backgroundColor:"#f8f8f8",outline:"none",border:this.state.messageValid?"none":"border: 1px solid #ff7500",resize:"none",borderRadius:"8px",overflow:"auto",boxShadow:"1px 1px 2px -1px #aaa"},disabled:this.state.disabled,onChange:function(t){return e.handleChange(t,"message")}})),this.state.showNotification&&d.default.createElement(p.default,{title:this.state.notificationTitle,body:this.state.notificationBody,duration:4e3}),d.default.createElement("button",{style:c({},h.button,{fontSize:"14px",marginLeft:"calc(100% - 46px)",padding:"2px 8px",borderRadius:"4px"}),onClick:this.commentMetaToggle},"评论"),d.default.createElement("div",{style:{marginLeft:"calc(100% - 220px)",transition:"all 0.5s",color:"#666",overflow:"hidden",height:this.state.showCommentMeta?120:0}},d.default.createElement("label",{style:h.label},d.default.createElement("span",{style:h.span}," 昵称 "),d.default.createElement("input",{type:"text",style:c({},h.input,{border:this.state.authorNameValid?"1px solid #ccc":" 1px solid #ff7500"}),value:this.state.authorName,disabled:this.state.disabled,onChange:function(t){return e.handleChange(t,"authorName")},placeholder:"昵称会被公开显示"})),d.default.createElement("label",{style:h.label},d.default.createElement("span",{style:h.span},"邮箱 "),d.default.createElement("input",{type:"text",style:c({},h.input,{border:this.state.authorEmailValid?"1px solid #ccc":" 1px solid #ff7500"}),value:this.state.authorEmail,disabled:this.state.disabled,onChange:function(t){return e.handleChange(t,"authorEmail")},placeholder:"邮箱不会公开显示"})),d.default.createElement("button",{onClick:function(){return e.submit()},style:c({},h.button,{marginLeft:"calc(100% - 46px)",outline:"none",borderRadius:"4px",height:"24px",width:"46px",border:"none"})},"发布")))}}]),t}();t.default=m},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),c=r(u),l=r(n(8)),f=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,u.Component),s(t,[{key:"render",value:function(){function e(t){if(0===i.length)return null;var n=[],r=!0,o=!1,a=void 0;try{for(var s,u=i[Symbol.iterator]();!(r=(s=u.next()).done);r=!0){var c=s.value;c.parent===t&&n.unshift({comment:c,author:c.author.name,isPrimary:c.author.username===window.disqusProxy.username||-1!==c.author.name.indexOf(window.disqusProxy.username),children:e(+c.id)})}}catch(e){o=!0,a=e}finally{try{!r&&u.return&&u.return()}finally{if(o)throw a}}return n.length?n:null}var t=this.props,n=t.comments,r=t.isLoading,o=[],i=[];n.forEach(function(e){(e.parent?i:o).push(e)});var a=o.map(function(t){return{comment:t,author:t.author.name,isPrimary:t.author.username===window.disqusProxy.username||-1!==t.author.name.indexOf(window.disqusProxy.username),children:e(+t.id)}});return c.default.createElement("div",{style:{overflowX:"auto"}},r?c.default.createElement("div",{style:{textAlign:"center",color:"#ccc",fontSize:14}},"评论加载中……"):a.length?c.default.createElement("ul",null,a.map(function(e){return c.default.createElement("li",{key:e.comment.id},c.default.createElement(l.default,{comment:e.comment,children:e.children,isPrimary:e.isPrimary,author:e.author}))})):c.default.createElement("div",{style:{textAlign:"center",color:"#ccc",fontSize:14}},"还没有评论呢"))}}]),t}();t.default=f},function(e,t,n){"use strict";function r(e){return i.default.createElement("div",{style:{padding:"0 10px"}},i.default.createElement("div",{style:{display:"inline-block"}},i.default.createElement("img",{src:e.isPrimary?window.disqusProxy.adminAvatar:s(e.comment.author),style:{width:40,height:40,borderRadius:"50%",boxShadow:" 1px 1px 3px 0.5px #ccc"},alt:"avatar"})),i.default.createElement("div",{style:{margin:"-60px 0 0 60px"}},i.default.createElement("p",{className:"comment-header"},i.default.createElement("span",{style:o({},a.span,{color:"#888",fontSize:14})},e.comment.author.name),e.isPrimary&&i.default.createElement("span",{style:o({},a.span,{boxSizing:"border-box",lineHeight:"16px",fontSize:12,backgroundColor:"#aaa",color:"white",padding:"0 3px",borderRadius:4})},"Admin"),e.replyTo&&i.default.createElement("span",{style:o({},a.span,{color:"#888",fontSize:14})},"发布",e.replyTo),i.default.createElement("span",{style:o({},a.span,{color:"#bbb",fontSize:12,fontFamily:"'calligraffittiregular', sans-serif"})},new Date(e.comment.createdAt).toLocaleString())),i.default.createElement("p",{className:"comment-body",style:{fontSize:14,color:"#34495e"},dangerouslySetInnerHTML:{__html:e.comment.message}})),e.children&&e.children.length>0&&i.default.createElement("ul",{className:"post-reply"},e.children.map(function(t){return i.default.createElement("li",{key:t.comment.id},i.default.createElement(r,{comment:t.comment,author:t.author,isPrimary:t.isPrimary,replyTo:e.author,children:t.children}))})))}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t.default=r;var i=function(e){return e&&e.__esModule?e:{default:e}}(n(0)),a={span:{display:"inline-block",marginRight:10}},s=function(e){if(-1===e.avatar.cache.indexOf("noavatar"))return e.avatar.cache;var t=function(e){for(var t=0,n=0;n<e.length;n++)t+=e.charCodeAt(n);return"rgb("+t%255+", "+t%245+", "+t%235+")"};return blockies.create({seed:e.name,color:t(e.name+"color"),bgcolor:t(e.name+"bgcolor"),spotcolor:t(e.name+"spotcolor")}).toDataURL()}},function(e,t,n){var r=n(10);"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0};o.transform=void 0;n(12)(r,o);r.locals&&(e.exports=r.locals)},function(e,t,n){(e.exports=n(11)(void 0)).push([e.i,"#disqus_proxy_thread {\n    padding-top: 0px;\n}\n\n#disqus_proxy_thread .comment-header,\n#disqus_proxy_thread .comment-body {\n    margin: 1em 0;\n}\n\n#disqus_proxy_thread .comment-body a {\n    color: #42b983;\n    text-decoration: none;\n}\n\n#disqus_proxy_thread .disqus-statement {\n    font-size: 12px;\n    padding-left: 92px;\n    color: rgba(0, 0, 0, 0.6);\n}\n\n#disqus_proxy_thread .disqus-statement a {\n    text-decoration: none;\n    color: #42b983;\n}\n\n#disqus_proxy_thread .disqus-proxy {\n    position: relative;\n    width: 100%;\n}\n\n#disqus_proxy_thread .disqus-proxy ul,\n#disqus_proxy_thread .disqus-proxy li {\n    list-style: none;\n}\n\n#disqus_proxy_thread .disqus-proxy ul {\n    line-height: normal;\n    margin-left: 56px;\n    padding: 0;\n}\n\n@media screen and (max-width: 500px) {\n    #disqus_proxy_thread .disqus-proxy ul,\n    #disqus_proxy_thread .disqus-proxy ul.post-reply {\n        margin-left: 10px;\n    }\n    #disqus_proxy_thread .disqus-proxy .disqus-statement {\n        padding-left: 80px;\n    }\n    #disqus_proxy_thread .disqus-proxy .comment-box .comment-info .avatar img {\n        width: 40px;\n        height: 40px;\n    }\n    #disqus_proxy_thread .disqus-proxy .comment-box .comment-info textarea {\n        left: 60px;\n        width: calc(100% - 60px);\n    }\n}\n",""])},function(e,t){function n(e,t){var n=e[1]||"",o=e[3];if(!o)return n;if(t&&"function"==typeof btoa){var i=r(o),a=o.sources.map(function(e){return"/*# sourceURL="+o.sourceRoot+e+" */"});return[n].concat(a).concat([i]).join("\n")}return[n].join("\n")}function r(e){return"/*# "+("sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e)))))+" */"}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var r=n(t,e);return t[2]?"@media "+t[2]+"{"+r+"}":r}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<e.length;o++){var a=e[o];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(e,t,n){function r(e,t){for(var n=0;n<e.length;n++){var r=e[n],o=h[r.id];if(o){o.refs++;for(a=0;a<o.parts.length;a++)o.parts[a](r.parts[a]);for(;a<r.parts.length;a++)o.parts.push(l(r.parts[a],t))}else{for(var i=[],a=0;a<r.parts.length;a++)i.push(l(r.parts[a],t));h[r.id]={id:r.id,refs:1,parts:i}}}}function o(e,t){for(var n=[],r={},o=0;o<e.length;o++){var i=e[o],a=t.base?i[0]+t.base:i[0],s={css:i[1],media:i[2],sourceMap:i[3]};r[a]?r[a].parts.push(s):n.push(r[a]={id:a,parts:[s]})}return n}function i(e,t){var n=y(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=g[g.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),g.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=y(e.insertInto+" "+e.insertAt.before);n.insertBefore(t,o)}}function a(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=g.indexOf(e);t>=0&&g.splice(t,1)}function s(e){var t=document.createElement("style");return e.attrs.type="text/css",c(t,e.attrs),i(e,t),t}function u(e){var t=document.createElement("link");return e.attrs.type="text/css",e.attrs.rel="stylesheet",c(t,e.attrs),i(e,t),t}function c(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function l(e,t){var n,r,o,i;if(t.transform&&e.css){if(!(i=t.transform(e.css)))return function(){};e.css=i}if(t.singleton){var c=v++;n=b||(b=s(t)),r=f.bind(null,n,c,!1),o=f.bind(null,n,c,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=u(t),r=p.bind(null,n,t),o=function(){a(n),n.href&&URL.revokeObjectURL(n.href)}):(n=s(t),r=d.bind(null,n),o=function(){a(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}function f(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=w(t,o);else{var i=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function d(e,t){var n=t.css,r=t.media;if(r&&e.setAttribute("media",r),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function p(e,t,n){var r=n.css,o=n.sourceMap,i=void 0===t.convertToAbsoluteUrls&&o;(t.convertToAbsoluteUrls||i)&&(r=x(r)),o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var a=new Blob([r],{type:"text/css"}),s=e.href;e.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}var h={},m=function(e){var t;return function(){return void 0===t&&(t=e.apply(this,arguments)),t}}(function(){return window&&document&&document.all&&!window.atob}),y=function(e){var t={};return function(n){if(void 0===t[n]){var r=e.call(this,n);if(r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}t[n]=r}return t[n]}}(function(e){return document.querySelector(e)}),b=null,v=0,g=[],x=n(13);e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||(t.singleton=m()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=o(e,t);return r(n,t),function(e){for(var i=[],a=0;a<n.length;a++){var s=n[a];(u=h[s.id]).refs--,i.push(u)}e&&r(o(e,t),t);for(a=0;a<i.length;a++){var u=i[a];if(0===u.refs){for(var c=0;c<u.parts.length;c++)u.parts[c]();delete h[u.id]}}}};var w=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,r=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var o=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(o))return e;var i;return i=0===o.indexOf("//")?o:0===o.indexOf("/")?n+o:r+o.replace(/^\.\//,""),"url("+JSON.stringify(i)+")"})}}]);