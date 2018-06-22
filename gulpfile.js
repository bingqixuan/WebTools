/**
 * Created by Rick Bing on 2017/1/16.
 */

var gulp = require('gulp'),
    concat = require('gulp-concat'),   //合并javascript文件，减少网络请求
    rename = require('gulp-rename'),    //更改名字
    uglify = require('gulp-uglify'),   //压缩javascript文件，减小文件大小
    minifycss = require('gulp-minify-css'),   //压缩css文件，减小文件大小
    imagemin = require('gulp-imagemin'), //压缩图片
    del = require('del'),
	lzmajs = require('gulp-lzmajs'),
    htmlminify = require('gulp-html-minify'),
    autoprefixer = require('gulp-autoprefixer'),
    spritesmith=require('gulp.spritesmith'),
	babel = require("gulp-babel");
    //os = require('os'),
    //child_process = require('child_process');

//合并JavaScript文件
gulp.task('concatJs',function(){
    gulp.src('World3D/*.js')
        .pipe(concat('PIE_WebGL_Co.js'))
        .pipe(gulp.dest('dist/concat'));
});

// 压缩 JavaScript 文件,逐个压缩
gulp.task('minifyJs', function(){
    // 1. 找到
    gulp.src('lib/*.js')
        // 2. 压缩
        .pipe(uglify({
			mangle: true,
			compress:true,
		}))
		.pipe(lzmajs())
        // 3. 另存
        .pipe(gulp.dest('dist/minify'));
});

//合并，并压缩JavaScript文件
gulp.task('minifyConcatJs', function() {
    return gulp.src(['lib/*.js'])
        .pipe(concat('min.js')) //合并后的文件名
        //.pipe(rename('PIE_WebGL.min.js'))
        .pipe(uglify({
			mangle: true,
			compress:true,
		}))
		.pipe(lzmajs())
        .pipe(gulp.dest('dist/minifyConcat'));
});

// 压缩 css 文件
// 在命令行使用 gulp css 启动此任务
gulp.task('minifyCss', function(){
    // 1. 找到文件
    gulp.src('css/*.css')
        // 2. 压缩文件
        .pipe(minifycss())
        // 3. 另存为压缩文件
        .pipe(gulp.dest('dist/css'))
});


// 压缩图片任务
// 在命令行输入 gulp images 启动此任务
gulp.task('minifyImages', function(){
    // 1. 找到图片
    gulp.src('images/*.*')
        // 2. 压缩图片
        .pipe(imagemin({
            progressive: true
        }))
        // 3. 另存图片
        .pipe(gulp.dest('dist/images'))
});

//压缩HTML
gulp.task('minifyHTML',function(){
    gulp.src('index.html')
        .pipe(htmlminify())
        .pipe(gulp.dest('./dist'));
});

//添加浏览器前缀
gulp.task('addPrefixToCss',function(){
    //自动为CSS添加浏览器前缀
    gulp.src('./css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],      // 浏览器版本
            cascade:true ,                      // 美化属性，默认true
            add: true,                           // 是否添加前缀，默认true
            remove: true,                        // 删除过时前缀，默认true
            flexbox: true                       // 为flexbox属性添加前缀，默认true
        }))
        .pipe(gulp.dest('./dist/css'));
});

//合成雪碧图
gulp.task('sprite', function () {
    return gulp.src('images/*.png')//需要合并的图片地址
        .pipe(spritesmith({
            imgName: 'sprite.png',//保存合并后图片的地址
            cssName: 'css/sprite.css',//保存合并后对于css样式的地址
            padding:5,//合并时两个图片的间距
            algorithm: 'binary-tree',//注释1
            cssTemplate: function (data) {
                var arr=[];
                data.sprites.forEach(function (sprite) {
                    arr.push(".icon-"+sprite.name+
                        "{" +
                        "background-image: url('"+sprite.escaped_image+"');"+
                        "background-position: "+sprite.px.offset_x+" "+sprite.px.offset_y+";"+
                        "width:"+sprite.px.width+";"+
                        "height:"+sprite.px.height+";"+
                        "}\n");
                });
                return arr.join("");
            }
        }))
        .pipe(gulp.dest('dist/images'));
});

// 将ES6转成ES5
gulp.task("es6toes5", function () {
  return gulp.src("src/*.js")// ES6 源码存放的路径
    .pipe(babel()) 
    .pipe(gulp.dest("lib")); //转换成 ES5 存放的路径
});