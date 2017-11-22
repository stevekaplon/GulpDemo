/* eslint one-var: ["error", { var: "never" }] */

var getWindowHeight = function () {
    return window.innerHeight;
};
var anotherOne = function () {
    return 0;
};

getWindowHeight();
anotherOne();
(function () {
    var foo = 1;

    foo += 1;

    return foo;
})();
//# sourceMappingURL=all.js.map
