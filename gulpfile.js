var gulp = require('gulp');

var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var paths = {
    scripts: ['src/pixnet.coffee', 'src/pixnet.*.coffee'],
    coffee: ['src/*.coffee']
};

gulp.task('scripts', function() {
    // Minify and copy all JavaScript
    return gulp.src(paths.scripts)
    .pipe(coffee())
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('lib/'));
});

gulp.task('scripts_dev', function() {
    // Copy all JavaScript
    return gulp.src(paths.scripts)
        .pipe(coffee())
        .pipe(concat('all.src.js'))
        .pipe(gulp.dest('lib/'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.run(['scripts_dev', 'scripts']);
    gulp.watch(paths.coffee[0], function() {
        gulp.run(['scripts_dev', 'scripts']);
    });
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts']);