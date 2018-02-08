"use strict";

let gulp = require('gulp');
let compileSchema = require('./gulp-compileschema');

// Compile task
gulp.task('compileSchemas', function () {
    console.info("CompileSchemas Task");
    return gulp.src('schemasRepository/**/*.json')
        .pipe(compileSchema())
        .pipe(gulp.dest('./outputSchemas'));
});

//Watch task
gulp.task('watchSchemas', function () {
    gulp.watch('schemasRepository/**/*.json', ['compileSchemas']);
});