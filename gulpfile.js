var gulp = require('gulp'),
	livereload = require('gulp-livereload'),
	sass = require('gulp-sass');

gulp.task('sass',function(){
	gulp.src('sass/*.scss')
		.pipe(sass({outStyle:"compressed"}))
		.pipe(gulp.dest('css'))
		.pipe(livereload());
});

gulp.task('watchcss',function(){
	livereload.listen();
	gulp.watch('sass/*.scss',['sass'])
});

gulp.task('js',function(){
	gulp.src('js/*.js')
		.pipe(livereload());
});

gulp.task('watchjs',function(){
	livereload.listen();
	gulp.watch('js/*.js',['js']);
});

