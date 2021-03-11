const {src, dest, watch, series} = require("gulp");

const sassCompile = require("gulp-sass");
const autoprefix = require("gulp-autoprefixer");
// const sourceMap = require("gulp-sourcemaps");
const cssNano = require("gulp-cssnano");
const browserSync = require('browser-sync').create();


/**
 *  <=== TOP LEVEL FUNTION ===>
 *  gulp.src - Point to file to use
 *  gulp dest - Point to folder to output
 *  gulp.watch - watch files and folder
 **/


//source Path Object
const srcPathObj = {
    htmlPath: "./src/*.html",
    imgaePath: "./src/images/**",
    sassPath: "./src/sass/**/*.scss",
    jsPath: "./src/js/*.js",
  };


//sass compile
function scssTask() {
    return src(srcPathObj.sassPath)
    .pipe(sassCompile().on("error", sassCompile.logError))
    .pipe(autoprefix())
    .pipe(cssNano())
    .pipe(dest("dist/css"));
}


//copy HTML files
function htmlTask() {
    return src(srcPathObj.htmlPath)
    .pipe(dest("./dist"))
}


//javascript 
function jsTask() {
    return src(srcPathObj.jsPath)
    .pipe(dest("dist/js"))
}


//all images Optimize
function imageTask() {
    return src(srcPathObj.imgaePath)  
    .pipe(dest("dist/images"));

    // .pipe(imagesOpt())
}

//browser sync server
function browserSyncServer(cb) {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
    cb();
}

function borwsersyncReload(cb) {
    browserSync.reload();
    cb();
}

//watchs all task
function watchTask() {
    watch(srcPathObj.htmlPath, borwsersyncReload);
    watch([srcPathObj.htmlPath, srcPathObj.imgaePath, srcPathObj.sassPath, srcPathObj.jsPath], series(htmlTask, imageTask, scssTask, jsTask, borwsersyncReload))
}

exports.default = series(
    htmlTask,
    imageTask,
    scssTask,
    jsTask,
    browserSyncServer,
    watchTask
);

