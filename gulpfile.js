var gulp = require('gulp'),
	livereload = require('gulp-livereload'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	mincss = require('gulp-clean-css');

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

gulp.task('mincss',function(){
	gulp.src('css/*.css')
		.pipe(mincss())
		.pipe(rename(function(path){
			path.basename += '.min';
		}))
		.pipe(gulp.dest('minCSS'));
});

gulp.task('minjs',function(){
	gulp.src('js/*.js')
		.pipe(uglify())
		.pipe(rename(function(path){
			path.basename += '.min';
		}))
		.pipe(gulp.dest('minJS'));
})

