/* eslint one-var: ["error", { var: "never" }] */

var getWindowHeight = function () {
    return window.innerHeight;
};
var anotherOne = function () {
    return 0;
};

getWindowHeight();
anotherOne();