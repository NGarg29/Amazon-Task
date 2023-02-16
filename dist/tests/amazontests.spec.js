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
require("mocha");
const chai_1 = require("chai");
const lib_1 = require("../lib");
const pages_1 = require("../pages");
describe('Amazon Task', () => __awaiter(void 0, void 0, void 0, function* () {
    let browser;
    let amazonPage;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        browser = new lib_1.Browser("chrome");
        amazonPage = new pages_1.AmazonPage(browser, "http://www.amazon.in");
    }));
    it('verify login to amazon successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        yield amazonPage.navigate();
        const accountName = yield amazonPage.SignInButton.getText();
        console.log(accountName);
        yield amazonPage.signIntoAmazon('8607300095', 'Neha@2929');
        (0, chai_1.expect)(yield amazonPage.SignInButton.getText()).to.not.equal(accountName);
    }));
    it('verify search functionality', () => __awaiter(void 0, void 0, void 0, function* () {
        yield amazonPage.navigate();
        const searchedText = 'apple watch';
        yield amazonPage.searchFunctionality(searchedText);
        (0, chai_1.expect)(yield amazonPage.searchedText.getText()).to.equal('"' + searchedText + '"');
    }));
    it('verify add to cart functionality', () => __awaiter(void 0, void 0, void 0, function* () {
        yield amazonPage.FirstSearchedItem.waitUntilLocatedAndDisplayed(10000);
        yield amazonPage.FirstSearchedItem.clickAndWaitStaleness();
        let winHandles = yield (yield browser.getDriver()).getAllWindowHandles();
        yield (yield browser.getDriver()).switchTo().window(winHandles[winHandles.length - 1]);
        yield amazonPage.AddToCart.click();
        yield amazonPage.AddToCartClose.click();
        yield amazonPage.CartCountButton.click();
        const cartItem = yield amazonPage.CartCount.getText();
        yield amazonPage.Quantity.waitUntilLocatedAndDisplayed();
        yield amazonPage.Quantity.click();
        yield amazonPage.SelectQuantity.clickAndWaitStaleness();
        (0, chai_1.expect)(yield amazonPage.CartCount.getText()).to.not.equal(cartItem);
    }));
    xit('verify add address functionality', () => __awaiter(void 0, void 0, void 0, function* () {
        yield amazonPage.SignInButton.click();
        yield amazonPage.AddressItem.click();
        yield amazonPage.AddAddress.click();
        yield amazonPage.AddAddressSubmitButton.scrollIntoView();
        yield amazonPage.AddAddressSubmitButton.click();
        yield amazonPage.FullName.sendKeys('Neha Garg');
        yield amazonPage.MobileNumber.sendKeys('8607300095');
        yield amazonPage.Pincode.sendKeys('132103');
        yield amazonPage.HouseNumber.sendKeys('50');
        yield amazonPage.City.sendKeys('Panipat');
        yield amazonPage.State.click();
        yield amazonPage.SelectState.click();
        yield amazonPage.AddAddressSubmitButton.click();
        const fullNameList = yield amazonPage.getFullNameList();
        fullNameList.forEach((element) => __awaiter(void 0, void 0, void 0, function* () {
            const str = yield element.getText();
            (0, chai_1.expect)(str).to.include('Neha Garg');
        }));
        const fullAddressesList = yield amazonPage.getAddressList();
        fullNameList.forEach((element) => __awaiter(void 0, void 0, void 0, function* () {
            const str = yield element.getText();
            (0, chai_1.expect)(str).to.include('50');
        }));
        const fullMobileNumberList = yield amazonPage.getMobileNumberList();
        fullNameList.forEach((element) => __awaiter(void 0, void 0, void 0, function* () {
            const str = yield element.getText();
            (0, chai_1.expect)(str).to.include('8607300095');
        }));
    }));
    xit('verify amazon account logout', () => __awaiter(void 0, void 0, void 0, function* () {
        yield amazonPage.SignInButton.hover();
        yield amazonPage.SignOut.click();
        (0, chai_1.expect)(yield amazonPage.Email.isDisplayed()).to.be.true;
    }));
}));
