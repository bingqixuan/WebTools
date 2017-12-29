# WebTools
一些web端脚本工具



gulpfile.js —— 打包脚本

## 功能：

合并、压缩js文件，压缩css文件，为css添加浏览器前缀，压缩HTML，合成雪碧图，压缩图片，ES6转ES5
   
## 使用方法：

```
npm install
```

如果用webstorm的话，右键gulpfile.js选择“show Tasks”，然后根据不同的需求选择不同的任务。
如果用其他编辑器的话，则需要全局安装一下gulp:
```
npm install -g gulp
```
然后根据gulpfile.js里面的任务名称执行不同的任务，如合并压缩js：
```
gulp minifyConcatJs
```
详情看gulpfile.js里面的源码及注释

