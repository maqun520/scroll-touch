# scroll-touch
Vue 滚动触底 mixins
# 前言
* 在app端常常看到类似加载数据的动画，接下来我们来实现滚动触底加载动画提示，以及如何复用这些逻辑。
# 如何判断滚动触底
## 情况一：
* 当文档高度还为超过可视区域高度时，不存在滚动，所以也没有滚动触底
![image](https://github.com/maqun520/scroll-touch/blob/master/1.png)
## 情况二：
* 当文档高度超过可视区域的高度时，还有剩余的文档没有滚动完，也就是说可视区域高度 + 滚动高度 < 文档高度，此时没有达到滚动触底的条件
![image](https://github.com/maqun520/scroll-touch/blob/master/2.png)
## 情况三：
* 文档高度大于可视区域，并且滚动到文档底部, 也就是说 可视区域高度 + 滚动高度 = 文档高度
![image](https://github.com/maqun520/scroll-touch/blob/master/3.png)
## 判断是否滚动到底

* 经过上面三种情况的分析，我们需要拿到 可视区域的高度 , 滚动高度 , 文档高度这三个变量来进行比较。
## 地址
* [codepenDemo](https://codepen.io/gwx-code/pen/wvvNdXP)
