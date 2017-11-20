/* eslint-env node */

const autoprefixer = require("gulp-autoprefixer"),
    eslint = require("gulp-eslint"),
    gulp = require("gulp"),
    sass = require("gulp-sass");
var Server = require('karma').Server;
var browserSync = require("browser-sync").create();

gulp.task("default", [
    "styles",
    "lint"
], () => {
    gulp.watch("sass/**/*.scss", ["styles"]);
    gulp.watch("js/**/*.js", ["lint"]);
});
gulp.task('tests', function (done) {
   return new Server({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true
    }, done).start();
  });

gulp.task("styles", () => {
    gulp.src("sass/**/*.scss").
        pipe(sass().on("error", sass.logError)).
        pipe(autoprefixer({
            "browsers": ["last 2 versions"],
            "cascade": false
        })).
        pipe(gulp.dest("./css"));
});

gulp.task("lint", () =>

    /*
     * ESLint ignores files with "node_modules" paths
     * So, it's best to have gulp ignore the directory as well.
     * Also, Be sure to return the stream from the task;
     * Otherwise, the task may end before the stream has finished.
     */
    gulp.src(["**/*.js','!node_modules/**"]).
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
        pipe(eslint.failAfterError()));

gulp.task("start", ["default"], () => {
    browserSync.init({"server": "./"});
    browserSync.stream();
});