// TODO: following deps are still manual:
// - colorpicker
// - datepicker-i18n
// - fileupload
// - jquery-touch-events
// - jquery-ui
// - qunit
// - redactor

var es = require('event-stream');
var gulp = require('gulp');
var concat = require('gulp-concat');
var jsonMinify = require('gulp-json-minify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var libPath = 'lib/';

var jsDeps = [
    //{ srcGlob: 'node_modules/bootstrap/dist/js/bootstrap.js', dest: dest+'bootstrap/js' },
    { srcGlob: 'node_modules/d3/build/d3.js', dest: libPath+'d3' },
    { srcGlob: 'node_modules/element-resize-detector/dist/element-resize-detector.js', dest: libPath+'element-resize-detector' },
    { srcGlob: 'node_modules/fabric/dist/fabric.js', dest: libPath+'fabric' },
    { srcGlob: 'node_modules/garnishjs/dist/garnish.js', dest: libPath+'garnishjs' },
    { srcGlob: 'node_modules/inputmask/dist/jquery.inputmask.bundle.js', dest: libPath+'jquery.inputmask' },
    { srcGlob: 'node_modules/jquery/dist/jquery.js', dest: libPath+'jquery' },
    { srcGlob: 'node_modules/jquery.payment/lib/jquery.payment.js', dest: libPath+'jquery.payment' },
    { srcGlob: 'node_modules/picturefill/dist/picturefill.js', dest: libPath+'picturefill' },
    { srcGlob: 'node_modules/punycode/punycode.js', dest: libPath+'punycode' },
    { srcGlob: 'node_modules/selectize/dist/js/standalone/selectize.js', dest: libPath+'selectize' },
    { srcGlob: 'node_modules/timepicker/jquery.timepicker.js', dest: libPath+'timepicker' },
    { srcGlob: 'node_modules/velocity-animate/velocity.js', dest: libPath+'velocity' },
    { srcGlob: 'node_modules/xregexp/xregexp-all.js', dest: libPath+'xregexp' },
    { srcGlob: 'node_modules/yii2-pjax/jquery.pjax.js', dest: libPath+'yii2-pjax' }
];

var d3LocaleData = [
    { srcGlob: 'node_modules/d3-format/locale/*.json', dest: libPath+'d3-format' },
    { srcGlob: 'node_modules/d3-time-format/locale/*.json', dest: libPath+'d3-time-format' }
];

var staticDeps = [
    { srcGlob: 'node_modules/bootstrap/dist/css/*', dest: libPath+'bootstrap/css' },
    { srcGlob: 'node_modules/bootstrap/dist/fonts/*', dest: libPath+'bootstrap/fonts' },
    { srcGlob: 'node_modules/selectize/dist/css/selectize.css', dest: libPath+'selectize' }
];

gulp.task('deps', function() {
    var streams = [];

    // Minify & move the JS deps
    jsDeps.forEach(function(dep) {
        streams.push(
            gulp.src(dep.srcGlob)
                //.pipe(gulp.dest(dest))
                .pipe(sourcemaps.init())
                .pipe(uglify())
                //.pipe(rename({ suffix: '.min' }))
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest(dep.dest))
        );
    });

    // Minify & move the D3 locale JSON
    d3LocaleData.forEach(function(dep) {
        streams.push(
            gulp.src(dep.srcGlob)
                .pipe(jsonMinify())
                .pipe(gulp.dest(dep.dest))
        );
    });

    // Statically move over any dep files we don't need to modify
    staticDeps.forEach(function(dep) {
        streams.push(
            gulp.src(dep.srcGlob)
                .pipe(gulp.dest(dep.dest))
        );
    });

    return es.merge(streams);
});
