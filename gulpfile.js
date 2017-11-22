/* eslint-env node */
/* eslint one-var: ["error", { var: "never" }] */
/* eslint arrow-body-style: ["error", "always"] */
/* eslint max-len: ["error", { "ignoreComments": true }] */
/* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */
const autoprefixer = require("gulp-autoprefixer"),
    babel = require("gulp-babel"),
    concat = require("gulp-concat"),
    eslint = require("gulp-eslint"),
    gulp = require("gulp"),
    print = require("gulp-print"),
    sass = require("gulp-sass"),
    sourcemaps = require("gulp-sourcemaps"),
    uglify = require("gulp-uglify");
var browserSync = require("browser-sync").create();
var Server = require("karma").Server;
var path = require("path");

gulp.task("default", [
    "copy-html",
    "copy-images",
    "styles",
    "lint",
    "scripts"
], () => {
    gulp.watch("sass/**/*.scss", ["styles"]);
    gulp.watch("js/**/*.js", [
        "lint",
        "scripts"
    ]);
    gulp.watch("./index.html", ["copy-html"]);
    gulp.watch("./dist/index.html").
        on("change", browserSync.reload);
    gulp.watch("./dist/js/all.js").
        on("change", browserSync.reload);
    gulp.watch("./dist/css/*.*").
        on("change", browserSync.reload);
});
gulp.task("dist", [
    "copy-html",
    "copy-images",
    "styles",
    "lint",
    "scripts-dist"
]);
gulp.task("tests", (done) => {
    return new Server({
        "configFile": path.join(__dirname, "karma.conf.js"),
        "singleRun": true
    }, done).start();
});

gulp.task("copy-html", () => {
    gulp.src("./index.html").
        pipe(gulp.dest("./dist"));
});

gulp.task("copy-images", () => {
    gulp.src("img/*").
        pipe(gulp.dest("dist/img"));
});

gulp.task("print", () => {
    gulp.src("./js/**/*.js").
        pipe(print());
});
gulp.task("scripts", () => {
    gulp.src("./js/**/*.js").
        pipe(sourcemaps.init()).
        pipe(babel()).
        pipe(concat("all.js")).
        pipe(sourcemaps.write(".")).
        pipe(gulp.dest("dist/js"));
});
gulp.task("scripts-dist", () => {
    return gulp.src(["./js/**/*.js"]).
        pipe(sourcemaps.init()).
        pipe(babel()).
        pipe(concat("all.js")).
        pipe(uglify()).
        pipe(sourcemaps.write(".")).
        pipe(gulp.dest("dist/js"));
});
gulp.task("styles", () => {
    gulp.src("sass/**/*.scss").
        pipe(sass({"outputStyle": "compressed"}).on("error", sass.logError)).
        pipe(autoprefixer({
            "browsers": ["last 2 versions"],
            "cascade": false
        })).
        pipe(gulp.dest("./dist/css"));
});

gulp.task("lint", () => {

    /*
     * ESLint ignores files with "node_modules" paths
     * So, it's best to have gulp ignore the directory as well.
     * Also, Be sure to return the stream from the task;
     * Otherwise, the task may end before the stream has finished.
     */
    return gulp.src([
        "./js/**/*.js",
        "!node_modules/**"
    ]).
        /* eslint() attaches the lint output to the "eslint" property
         * of the file object so it can be used by other modules. */
        pipe(eslint()).
        /* eslint.format() outputs the lint results to the console.
         * Alternatively use eslint.formatEach() (see Docs). */
        pipe(eslint.format()).

        /*
         * To have the process exit with an error code (1) on
         * lint error, return the stream and pipe to failAfterError last.
         */
        pipe(eslint.failAfterError());
});

gulp.task("start", ["default"], () => {
    browserSync.init({"server": "./dist"});
    browserSync.stream();
});