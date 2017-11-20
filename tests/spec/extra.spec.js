/* eslint-env jasmine */


describe("window height", () => {
    it("returns window height", () => {
        expect(getWindowHeight()).toEqual(jasmine.any(Number));
    });
});