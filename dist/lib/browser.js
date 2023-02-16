"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Browser = void 0;
require("chromedriver");
const selenium_webdriver_1 = require("selenium-webdriver");
class Browser {
    constructor(browserName) {
        this.browserName = browserName;
        this.driver = new selenium_webdriver_1.Builder().forBrowser(browserName).build();
    }
    getDriver() {
        return this.driver;
    }
    navigate(url) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.driver.navigate().to(url);
        });
    }
    findElementBySelector(selector) {
        return this.driver.findElement(selector);
    }
    findElements(selector) {
        return this.driver.findElements(selector);
    }
    sleep(timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.driver.sleep(timeout);
        });
    }
    wait(condition, timeout = 3000) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.driver
                .wait(condition, timeout)
                .catch((err) => console.log(err, "error"));
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.driver.quit();
        });
    }
}
exports.Browser = Browser;
