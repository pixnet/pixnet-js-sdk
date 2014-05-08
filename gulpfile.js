var gulp = require('gulp');

var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var paths = {
    scripts: ['src/pixnet.coffee', 'src/pixnet.*.coffee']
};

gulp.task('scripts', function() {
    // Minify and copy all JavaScript (except vendor scripts)
    return gulp.src(paths.scripts)
    .pipe(coffee())
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('lib/'));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts']);