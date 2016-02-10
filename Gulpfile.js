
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var jscs = require('gulp-jscs');
var jshint = require('jshint');

var sass = require('gulp-sass');
    autoprefixer = require('gulp-autoprefixer');
    minifyCSS = require('gulp-minify-css');
    rename = require('gulp-rename');


gulp.task('uglify', function(){
     gulp.src('js/main.js') // What files do we want gulp to consume?
        .pipe(plumber({errorHandler:notify.onError("Error: <%= error.message %")}))
        .pipe(jscs())
        .pipe(jscs.reporter())
        //.pipe(jshint())
        //.pipe(jshint.reporter())
        .pipe(uglify()) // Call the uglify function on these files
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('./build')); // Where do we put the result?
 });


gulp.task('sass', function(){
  gulp.src('./scss/style.scss')
  .pipe(sass())
   .pipe(autoprefixer({
     browsers: ['last 2 versions']
   }))
  .pipe(minifyCSS())
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest('./build/css'));
  });


gulp.task('watch', function(){
  browserSync.init({
    server: {
      baseDir: './'
    }
 });

gulp.watch('./scss/*.scss', ['sass']);
gulp.watch(['./js/main.js'], ['uglify']);
gulp.watch(['./build/main.js', 'index.html', './build/css/style.min.css']).on('change', browserSync.reload);

  //have to add uglify task before other tasks

 });

 gulp.task('default', ['uglify', 'watch']);
