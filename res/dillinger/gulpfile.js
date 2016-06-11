var gulp = require('gulp');

var sass = require('gulp-sass');
var concat = require('gulp-concat');

// 编译sass
gulp.task('sass', function () {
    gulp.src(['scss/*.scss','scss/**/_*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('css'))
});

gulp.task('concat',function(){
    gulp.src('./css').pipe(concat('app.css')).pipe(gulp.dest('./css'));
});

gulp.task('default',function(){
    gulp.run('sass','concat');
    
});