// karma.conf.js
module.exports = function(config) {
    config.set({
      basePath: "",
      frameworks: ["jasmine"],
      files: [
        "js/**/*.js",
      "tests/**/*.spec.js"],
      browsers:[ "Chrome"],
      reporters: ['spec'],
     /* specReporter: {
        maxLogLines: 5,             // limit number of lines logged per test 
        suppressErrorSummary: true, // do not print error summary 
        suppressFailed: false,      // do not print information about failed tests 
        suppressPassed: false,      // do not print information about passed tests 
        suppressSkipped: true,      // do not print information about skipped tests 
        showSpecTiming: true,      // print the time elapsed for each spec 
        failFast: true              // test would finish with error when a first fail occurs.  
      },
      plugins: ["karma-spec-reporter"],*/
    });
  };