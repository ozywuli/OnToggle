
/*------------------------------------*\
  PLUGINS
\*------------------------------------*/
var gulp = require('gulp');
var del = require('del');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var size = require('gulp-size');

var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var nanocss = require('gulp-cssnano');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');

/*------------------------------------*\
  HANDLE ERRORS
\*------------------------------------*/
function handleError(error) {
    var message = error;
    if (typeof error === 'function' ) { return; }
    if (typeof error === 'object' && error.hasOwnProperty('message')) { message = error.message; }
    if (message !== undefined) { console.log('Error: ' + message); }
}

gulp.task('clean', function() {
    return del(['build']);
});


/*------------------------------------*\
  HTML
\*------------------------------------*/
gulp.task('html', function() {
    gulp.src('./src/index.html')
        .pipe(gulp.dest('dev'))
})



/*------------------------------------*\
  CSS
\*------------------------------------*/
gulp.task('css', function() {
    gulp.src('./src/scss/main.scss')
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['node_modules/foundation-sites/scss']
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dev/css'))
});


/*------------------------------------*\
  JS
\*------------------------------------*/
function compile(watch) {
    var bundler = watchify(browserify('./src/js/OnToggle.js', {
        debug: true,
        extensions: ['js']
    }).transform(babelify.configure({
            presets: ["es2015"]
        }))
    );

    function rebundle() {
        bundler.bundle()
        .on('error', function(err) {
                console.error(err);
                this.emit('end');
            }
        )
        .pipe(source('OnToggle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dev/js'))
    }

    if (watch) {
        bundler.on('update', function() {
            console.log('-> bundling...');
            rebundle();
        });
    }

    rebundle();
}


function watchJS() {
    return compile(true);
};


gulp.task('js', function() {
    return compile();
});

gulp.task('tmp-js', function() {
    gulp.src('./src/js/*.js')
        .pipe(gulp.dest('dist'));
});

/*------------------------------------*\
  WATCH
\*------------------------------------*/
gulp.task('watch', function(error) {
    gulp.watch('./src/*.html', ['html']);
    gulp.watch('./src/scss/main.scss', ['css']);
    gulp.watch('./src/js/OnToggle.js', ['js', 'tmp-js']);

    watchJS();
});



/*------------------------------------*\
  BUILD
\*------------------------------------*/
gulp.task('build', function() {
    console.log('Ready to go!');
});



/*------------------------------------*\
  DEFAULT TASK
\*------------------------------------*/
gulp.task('default', ['watch', 'html', 'css', 'js', 'tmp-js']);
