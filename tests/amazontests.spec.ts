import 'mocha';
import { expect } from "chai";
import { Browser } from "../lib";
import { AmazonPage } from '../pages';


describe('Amazon Task', async ()=> {
    let browser: Browser;
    let amazonPage: AmazonPage;

    before(async () => {
        browser = new Browser("chrome");
        amazonPage = new AmazonPage(browser, "http://www.amazon.in/");
      });

    it.skip('verify login to amazon successfully', async ()=> {
        await amazonPage.navigate();
        const accountName = await amazonPage.SignInButton.getText();
        console.log(accountName);
        await amazonPage.signIntoAmazon('8607300095', 'Neha@2929');
        expect(await amazonPage.SignInButton.getText()).to.not.equal(accountName);
    });

    it('verify search functionality', async ()=> {
        await amazonPage.navigate();
        const searchedText: string = 'apple watch';
        await amazonPage.searchFunctionality(searchedText);
        expect(await amazonPage.searchedText.getText()).to.equal('"' + searchedText + '"');
    });

    it('verify add to cart functionality', async ()=> {
        await amazonPage.FirstSearchedItem.waitUntilLocatedAndDisplayed(10000);
        await amazonPage.FirstSearchedItem.clickAndWaitStaleness();
        let winHandles = await (await browser.getDriver()).getAllWindowHandles();
        await (await browser.getDriver()).switchTo().window(winHandles[winHandles.length-1]);
        await amazonPage.AddToCart.click();
        await amazonPage.AddToCartClose.click();
        await amazonPage.CartCountButton.click();
        const cartItem: string = await amazonPage.CartCount.getText(); 
        await amazonPage.Quantity.waitUntilLocatedAndDisplayed();
        await amazonPage.Quantity.click();
        await amazonPage.SelectQuantity.clickAndWaitStaleness();
        expect(await amazonPage.CartCount.getText()).to.not.equal(cartItem);
    });

    it.skip('verify add address functionality', async ()=> {
        await amazonPage.SignInButton.click();
        await amazonPage.AddressItem.click();
        await amazonPage.AddAddress.click();
        await amazonPage.AddAddressSubmitButton.scrollIntoView();
        await amazonPage.AddAddressSubmitButton.click();
        await amazonPage.FullName.sendKeys('Neha Garg');
        await amazonPage.MobileNumber.sendKeys('8607300095');
        await amazonPage.Pincode.sendKeys('132103');
        await amazonPage.HouseNumber.sendKeys('50');
        await amazonPage.City.sendKeys('Panipat');
        await amazonPage.State.click();
        await amazonPage.SelectState.click();
        await amazonPage.AddAddressSubmitButton.click();
        const fullNameList = await amazonPage.getFullNameList();
        fullNameList.forEach(async element => {
            const str = await element.getText();
            expect(str).to.include('Neha Garg');
        });

        const fullAddressesList = await amazonPage.getAddressList();
        fullNameList.forEach(async element => {
            const str = await element.getText();
            expect(str).to.include('50');
        });

        const fullMobileNumberList = await amazonPage.getMobileNumberList();
        fullNameList.forEach(async element => {
            const str = await element.getText();
            expect(str).to.include('8607300095');
        });
    });

    it.skip('verify amazon account logout', async ()=> {
        await amazonPage.SignInButton.hover();
        await amazonPage.SignOut.click();
        expect(await amazonPage.Email.isDisplayed()).to.be.true;
    });
});