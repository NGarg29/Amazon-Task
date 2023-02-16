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
exports.TextInput = exports.Button = exports.WebComponent = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
class WebComponent {
    constructor(browser, selector) {
        this.browser = browser;
        this.selector = selector;
    }
    click() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const element = yield this.getElement();
                return yield element.click();
            }
            catch (clickErr) {
                try {
                    const element = yield this.getElement();
                    yield element
                        .getDriver()
                        .executeScript("arguments[0].click();", element);
                }
                catch (jsErr) {
                    throw clickErr;
                }
            }
        });
    }
    scrollIntoView() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const element = yield this.getElement();
                yield element
                    .getDriver()
                    .executeScript("arguments[0].scrollIntoView(true);", element);
            }
            catch (jsErr) {
                throw jsErr;
            }
        });
    }
    hover() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const element = yield this.getElement();
                yield element
                    .getDriver()
                    .executeScript("arguments[0].hover();", element);
            }
            catch (jsErr) {
                throw jsErr;
            }
        });
    }
    getElement() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.browser.wait(selenium_webdriver_1.until.elementLocated(this.selector));
            return yield this.browser.findElementBySelector(this.selector);
        });
    }
    isDisplayed() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const element = yield this.getElement();
                return yield element.isDisplayed();
            }
            catch (ex) {
                return false;
            }
        });
    }
    getText() {
        return __awaiter(this, void 0, void 0, function* () {
            const element = yield this.getElement();
            return yield element.getText();
        });
    }
    isLocated(timeout = 6000) {
        return __awaiter(this, void 0, void 0, function* () {
            return !!(yield this.browser.wait(selenium_webdriver_1.until.elementLocated(this.selector), timeout));
        });
    }
    clickAndWaitStaleness(waitTime = 3000) {
        return __awaiter(this, void 0, void 0, function* () {
            const element = yield this.getElement();
            yield element.click();
            yield this.browser.wait(selenium_webdriver_1.until.stalenessOf(element), waitTime);
        });
    }
    waitUntilLocatedAndDisplayed(timeout = 3000) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.browser.wait(() => __awaiter(this, void 0, void 0, function* () {
                if (yield this.isLocated(5000)) {
                    return this.isDisplayed();
                }
                else {
                    return false;
                }
            }), timeout);
        });
    }
    sendKeys(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const element = yield this.getElement();
            return yield element.sendKeys(key);
        });
    }
}
exports.WebComponent = WebComponent;
class Button extends WebComponent {
    constructor(browser, selector) {
        super(browser, selector);
        this.browser = browser;
        this.selector = selector;
    }
}
exports.Button = Button;
class TextInput extends WebComponent {
    constructor(browser, selector) {
        super(browser, selector);
    }
}
exports.TextInput = TextInput;
