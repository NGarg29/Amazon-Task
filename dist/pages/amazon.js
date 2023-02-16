"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.AmazonPage = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
const lib_1 = require("../lib");
class AmazonPage extends lib_1.Page {
    constructor(browser, url) {
        super(browser);
        this.setUrl(url);
    }
    signIntoAmazon(email, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.SignInButton.waitUntilLocatedAndDisplayed();
            yield this.SignInButton.click();
            yield this.Email.waitUntilLocatedAndDisplayed();
            yield this.Email.sendKeys(email);
            yield this.Continue.click();
            yield this.Password.waitUntilLocatedAndDisplayed();
            yield this.Password.sendKeys(pass);
            yield this.Login.clickAndWaitStaleness();
        });
    }
    searchFunctionality(item) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.SearchBar.waitUntilLocatedAndDisplayed();
            yield this.SearchBar.click();
            yield this.SearchBar.sendKeys(item);
            yield this.SearchBar.sendKeys(selenium_webdriver_1.Key.ENTER);
            yield this.FirstSearchedItem.waitUntilLocatedAndDisplayed();
            yield this.searchedText.waitUntilLocatedAndDisplayed();
        });
    }
    getFullNameList() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (yield this.browser.getDriver()).findElements(selenium_webdriver_1.By.xpath('//div[contains(@id,"address-block")]//span[contains(@id,"FullName")]'));
        });
    }
    getAddressList() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.browser.findElements(selenium_webdriver_1.By.xpath('//div[contains(@id,"address-block")]//span[contains(@id,"AddressLineOne")]'));
        });
    }
    getMobileNumberList() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.browser.findElements(selenium_webdriver_1.By.xpath('//div[contains(@id,"address-block")]//span[contains(@id,"PhoneNumber")]'));
        });
    }
    getApp(appName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.browser.findElementBySelector(selenium_webdriver_1.By.xpath(`(//*[name()="use" and @*="#icon-commerceos-${appName}"])[1]`));
        });
    }
}
__decorate([
    (0, lib_1.findBy)(selenium_webdriver_1.By.css('a#nav-link-accountList div span')),
    __metadata("design:type", lib_1.Button)
], AmazonPage.prototype, "SignInButton", void 0);
__decorate([
    (0, lib_1.findBy)(selenium_webdriver_1.By.css('input#ap_email')),
    __metadata("design:type", lib_1.TextInput)
], AmazonPage.prototype, "Email", void 0);
__decorate([
    (0, lib_1.findBy)(selenium_webdriver_1.By.css('input#continue')),
    __metadata("design:type", lib_1.TextInput)
], AmazonPage.prototype, "Continue", void 0);
__decorate([
    (0, lib_1.findBy)(selenium_webdriver_1.By.css('input#ap_password')),
    __metadata("design:type", lib_1.TextInput)
], AmazonPage.prototype, "Password", void 0);
__decorate([
    (0, lib_1.findBy)(selenium_webdriver_1.By.css('input#signInSubmit')),
    __metadata("design:type", lib_1.TextInput)
], AmazonPage.prototype, "Login", void 0);
__decorate([
    (0, lib_1.findBy)(selenium_webdriver_1.By.css('input#twotabsearchtextbox')),
    __metadata("design:type", lib_1.TextInput)
], AmazonPage.prototype, "SearchBar", void 0);
__decorate([
    (0, lib_1.findBy)(selenium_webdriver_1.By.css('div[cel_widget_id= MAIN-SEARCH_RESULTS-2] img')),
    __metadata("design:type", lib_1.Button)
], AmazonPage.prototype, "FirstSearchedItem", void 0);
__decorate([
    (0, lib_1.findBy)(selenium_webdriver_1.By.css('span.a-color-state')),
    __metadata("design:type", lib_1.TextInput)
], AmazonPage.prototype, "searchedText", void 0);
__decorate([
    (0, lib_1.findBy)(selenium_webdriver_1.By.css('input#add-to-cart-button')),
    __metadata("design:type", lib_1.Button)
], AmazonPage.prototype, "AddToCart", void 0);
__decorate([
    (0, lib_1.findBy)(selenium_webdriver_1.By.css('a.close-button')),
    __metadata("design:type", lib_1.Button)
], AmazonPage.prototype, "AddToCartClose", void 0);
__decorate([
    (0, lib_1.findBy)(selenium_webdriver_1.By.css('span#nav-cart-count')),
    __metadata("design:type", lib_1.Button)
], AmazonPage.prototype, "CartCountButton", void 0);
__decorate([
    (0, lib_1.findBy)(selenium_webdriver_1.By.css('form#gutterCartViewForm span.sc-number-of-items')),
    __metadata("design:type", lib_1.Button)
], AmazonPage.prototype, "CartCount", void 0);
__decorate([
    (0, lib_1.findBy)(selenium_webdriver_1.By.css('select#quantity')),
    __metadata("design:type", lib_1.Button)
], AmazonPage.prototype, "Quantity", void 0);
__decorate([
    (0, lib_1.findBy)(selenium_webdriver_1.By.css('a#quantity_2')),
    __metadata("design:type", lib_1.Button)
], AmazonPage.prototype, "SelectQuantity", void 0);
__decorate([
    (0, lib_1.findBy)(selenium_webdriver_1.By.xpath('//div[@data-card-identifier="AddressesAnd1Click"]')),
    __metadata("design:type", lib_1.Button)
], AmazonPage.prototype, "AddressItem", void 0);
__decorate([
    (0, lib_1.findBy)(selenium_webdriver_1.By.css('div.address-plus-icon')),
    __metadata("design:type", lib_1.Button)
], AmazonPage.prototype, "AddAddress", void 0);
__decorate([
    (0, lib_1.findBy)(selenium_webdriver_1.By.xpath('//span[contains(@id,"submit-button-announce")]')),
    __metadata("design:type", lib_1.Button)
], AmazonPage.prototype, "AddAddressSubmitButton", void 0);
__decorate([
    (0, lib_1.findBy)(selenium_webdriver_1.By.xpath('//input[contains(@id,"enterAddressFullName")]')),
    __metadata("design:type", lib_1.Button)
], AmazonPage.prototype, "FullName", void 0);
__decorate([
    (0, lib_1.findBy)(selenium_webdriver_1.By.xpath('//input[contains(@id,"enterAddressPhoneNumber")]')),
    __metadata("design:type", lib_1.Button)
], AmazonPage.prototype, "MobileNumber", void 0);
__decorate([
    (0, lib_1.findBy)(selenium_webdriver_1.By.xpath('//input[contains(@id,"enterAddressPostalCode")]')),
    __metadata("design:type", lib_1.Button)
], AmazonPage.prototype, "Pincode", void 0);
__decorate([
    (0, lib_1.findBy)(selenium_webdriver_1.By.xpath('//input[contains(@id,"enterAddressLine1")]')),
    __metadata("design:type", lib_1.Button)
], AmazonPage.prototype, "HouseNumber", void 0);
__decorate([
    (0, lib_1.findBy)(selenium_webdriver_1.By.xpath('//input[contains(@id,"enterAddressCity")]')),
    __metadata("design:type", lib_1.Button)
], AmazonPage.prototype, "City", void 0);
__decorate([
    (0, lib_1.findBy)(selenium_webdriver_1.By.xpath('//span[contains(@id,"enterAddressStateOrRegion")]')),
    __metadata("design:type", lib_1.Button)
], AmazonPage.prototype, "State", void 0);
__decorate([
    (0, lib_1.findBy)(selenium_webdriver_1.By.xpath('(//a[contains(@id,"enterAddressStateOrRegion")])[1]')),
    __metadata("design:type", lib_1.Button)
], AmazonPage.prototype, "SelectState", void 0);
__decorate([
    (0, lib_1.findBy)(selenium_webdriver_1.By.css('a#nav-item-signout')),
    __metadata("design:type", lib_1.Button)
], AmazonPage.prototype, "SignOut", void 0);
exports.AmazonPage = AmazonPage;
