---


---

<hr>
<p>title: JS 死循环的手动终止以及代码熔断方法</p>
<p>date: 2019-01-25 14:35:00</p>
<p>tags: [JS 调试]</p>
<hr>
<p>最近工作中遇到了一些死循环导致的页面卡死问题，经过 trouble shooting 和代码修复解决了问题，在此也顺便整理了一下 JS 死循环的手动终止以及代码熔断方法。</p>
<!--more-->
<h2 id="被死循环卡死的页面">被死循环卡死的页面</h2>
<p>你是否遇到这样的场景，在你执行了页面上某个动作后，一些怪异的事情发生了：</p>
<ul>
<li>页面卡死了，点击页面上任何按钮，或者是尝试滚动页面都没有任何反应。</li>
<li>过了几秒后，电脑的风扇开始加速转动，声音变大。</li>
<li>然后，你尝试关闭页面，发现连页面都关不了（刚卡死不太久时候其实还能关闭）。</li>
<li>接着，你尝试关闭浏览器，但也没有任何反应。随着风扇转动地更快，你也开始焦急了。</li>
<li>无奈，你打开任务管理器关闭了浏览器的进程。</li>
<li>当你想再试试触发这一切的那个“动作”时候，上述事情还是如期而至。</li>
<li>……<br>
<a href="https://imgchr.com/i/kmNDsJ"><img src="https://s2.ax1x.com/2019/01/25/kmNDsJ.png" alt="kmNDsJ.png"></a></li>
</ul>
<p>那么这时候很有可能，你的 JS 代码里出现了死循环（Infinite Loop）。</p>
<p>死循环出现的原因很多：</p>
<ul>
<li>组件更新回调里再次调用了更新方法。</li>
<li>表单项 A 和 B 相互联动。</li>
<li>递归函数里忘记写了终止逻辑，或是终止逻辑有问题。</li>
<li>……</li>
</ul>
<p>死循环严重影响用户体验，甚至伤机器，我们要尽力避免，但完全规避是不可能的，毕竟程序员也是人，也会犯错。所以，今天我们要介绍如何手动终止死循环，以及如何用代码熔断死循环。</p>
<h2 id="手动终止死循环">手动终止死循环</h2>
<p>如果你尝试调用任务管理器，关闭浏览器进程，这样的操作成本较高，你还要重新打开浏览器，打开页面。但是不这么做，页面就会卡死，你“什么也做不了”。其实，在 Chrome 67及以上版本中，还是有方法可以在不杀死浏览器进程的前提下终止死循环的。方法如下：</p>
<ul>
<li>打开开发者工具 DevTools（F12）。</li>
<li>点开 <strong>Sources</strong> 面板，点击 “Pause script execution” 按钮，发现代码就暂停了。</li>
<li>然后长按“Pause script execution” 按钮，并选择 “Stop” 图标，就终止死循环了。</li>
</ul>
<p><img src="https://i.stack.imgur.com/iYiF1.png" alt="手动终止"></p>
<h2 id="代码熔断">代码熔断</h2>
<p>手动终止只是减少杀死浏览器进程重启的成本，我们最好还能用代码来熔断一些死循环。下面是熔断函数：</p>
<pre class=" language-js"><code class="prism  language-js"><span class="token keyword">const</span> loopBreaker <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> startTime<span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    startTime <span class="token operator">=</span> startTime <span class="token operator">||</span> <span class="token punctuation">(</span>startTime <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    count <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token comment">// 更改阈值为你想要的，这里是 10000</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">&gt;</span> <span class="token number">10000</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> startTime <span class="token operator">&gt;</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">"Loop Broken!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 一秒后清空</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> startTime <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>上述函数中 <code>count</code> 是循环执行次数，<code>startTime</code> 是首次执行函数的时间。如果循环超过 10000 次，且循环时间超过 1000 毫秒，那么就熔断。</p>
<p>使用方法：</p>
<pre class=" language-js"><code class="prism  language-js"><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1000000</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">loopBreaker</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
<p>还可以改写这个函数以支持更多的功能，如：日志格式、熔断阈值等，快去试试吧！</p>
<h2 id="结语">结语</h2>
<p>本文介绍了 JS 死循环的手动终止以及代码熔断方法。但解决问题的方法肯定不止于此，比如一些 Babel 插件可以转换所有循环代码，但就不再赘述了。最后，希望可以本文给遇到死循环的读者一些参考。</p>

