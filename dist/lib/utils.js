"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findBy = exports.delay = void 0;
require("reflect-metadata");
const selenium_webdriver_1 = require("selenium-webdriver");
const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
exports.delay = delay;
function findBy(selector) {
    return (target, propertyKey) => {
        const type = Reflect.getMetadata("design:type", target, propertyKey);
        Object.defineProperty(target, propertyKey, {
            configurable: true,
            enumerable: true,
            get: function () {
                if (typeof selector === "string") {
                    return new type(this.browser, selenium_webdriver_1.By.css(selector));
                }
                return new type(this.browser, selector);
            },
        });
    };
}
exports.findBy = findBy;
