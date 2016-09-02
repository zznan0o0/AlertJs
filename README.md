# 弹窗插件
## example
```javascript
//实例化对象(必要)
window.onload = function(){
    var layout = new Alert();
}
```

## 标签属性弹窗
标签弹窗提供了俩种 iframe弹窗和图片弹窗
    任意html标签上定义属性alert-open为ifame弹窗, img-open为图片弹窗
    
```html
<div alert-open="https://www.baidu.com/" alert-width="" alert-height="">点我弹出</div>
<img img-open="http://p4.so.qhmsg.com/t01351866ea9a023de9.jpg" img-event="" img-width="" img-height="" src="http://img13.3lian.com/201404/22/a5555e3b7d0cc34051c48806926aecf8.png">
```


## 详细
### 1. iframe层
标签触发：true
js调用: true
能否拖动: true

```html
<div alert-open="https://www.baidu.com/" alert-width="" alert-height="">
```
    alert-open: iframe层属性定义的是打开地址 
    alert-width alert-height: 为宽高默认是600*400 px (若要定义一定要带单位)

```javascript
layout.layoutShow('http://www.baidu.com', '1000px', '800px');
```
    js调用iframe层 layoutShow(src, width, height);

### 2. img层
标签触发：true
js调用: true
能否拖动: false
鼠标点击关闭: true

```html
<img img-open="http://p4.so.qhmsg.com/t01351866ea9a023de9.jpg" img-event="" img-width="" img-height="" src="http://img13.3lian.com/201404/22/a5555e3b7d0cc34051c48806926aecf8.png">
```
    img-open: img层属性定义的是打开地址 如果定义为on以img 中src为打开地址
    img-width img-height: 为宽高默认是图片原大小 (若要定义一定要带单位)

```javascript
layout.imgOutShow('http://p4.so.qhmsg.com/t01351866ea9a023de9.jpg', '1000px', '800px');
setTimeout(layout.imgOutHide.bind(layout), 2000);
```
    js调用img:  imgOutShow(src, width, height);
    js关闭img: layout.imgOutHide();

### 3. loading 层
标签触发：false
js调用: true
能否拖动: false
鼠标点击关闭: false
遮罩层: false
```javascript
layout.loadingShow();
setTimeout(layout.loadingHide.bind(layout), 3000);
```
    loadingShow: 出现加载层
    loadingHide: 隐藏加载层    

### 4. 文字提示层
标签触发：false
js调用: true
能否拖动: false
鼠标点击关闭: true
遮罩层: false
```javascript
layout.promptShow('hashhsf');
setTimeout(layout.promptHide.bind(layout), 3000);
layout.promptClickHide();
```
    promptShow(context): 文字层出现
    promptHide：文字层隐藏
    promptClickHide 如果需要点击弹窗消失需要执行此函数

### 5. div弹出层
标签触发：false
js调用: true
能否拖动: true
鼠标点击关闭: true
遮罩层: true
```javascript
layout.outDivShow('<img src="http://img13.3lian.com/201404/22/a5555e3b7d0cc34051c48806926aecf8.png" style="width:100%;height:100%;">', '1000px', '800px');
```
    outDivShow: div弹出层出现
