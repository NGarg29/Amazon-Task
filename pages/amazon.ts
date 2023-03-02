import { By, Key, WebElement, WebElementPromise } from "selenium-webdriver";
import {
  Browser,
  Page,
  findBy,
  TextInput,
  Button,
} from "../lib";

export class AmazonPage extends Page {
  constructor(browser: Browser, url: string) {
    super(browser);
    this.setUrl(url);
  }

  @findBy(By.css('a#nav-link-accountList div span'))
  public SignInButton: Button;

  @findBy(By.css('input#ap_email'))
  public Email: TextInput;

  @findBy(By.css('input#continue'))
  public Continue: Button;

  @findBy(By.css('input#ap_password'))
  public Password: TextInput;

  @findBy(By.css('input#signInSubmit'))
  public Login: Button;

  @findBy(By.css('input#twotabsearchtextbox'))
  public SearchBar: TextInput;

  @findBy(By.css('div[cel_widget_id= MAIN-SEARCH_RESULTS-3] img'))
  public FirstSearchedItem: Button;

  @findBy(By.css('span.a-color-state'))
  public searchedText: Button;

  @findBy(By.css('input#add-to-cart-button'))
  public AddToCart: Button;
  
  @findBy(By.css('a.close-button'))
  public AddToCartClose: Button;
  
  @findBy(By.css('span#nav-cart-count'))
  public CartCountButton: Button;

  @findBy(By.css('form#gutterCartViewForm span.sc-number-of-items'))
  public CartCount: Button;
  
  @findBy(By.css('select#quantity'))
  public Quantity: Button;

  @findBy(By.css('a#quantity_2'))
  public SelectQuantity: Button;
  
  @findBy(By.xpath('//div[@data-card-identifier="AddressesAnd1Click"]'))
  public AddressItem: Button;
  
  @findBy(By.css('div.address-plus-icon'))
  public AddAddress: Button;

  @findBy(By.xpath('//span[contains(@id,"submit-button-announce")]'))
  public AddAddressSubmitButton: Button;

  @findBy(By.xpath('//input[contains(@id,"enterAddressFullName")]'))
  public FullName: Button;

  @findBy(By.xpath('//input[contains(@id,"enterAddressPhoneNumber")]'))
  public MobileNumber: Button;

  @findBy(By.xpath('//input[contains(@id,"enterAddressPostalCode")]'))
  public Pincode: Button;

  @findBy(By.xpath('//input[contains(@id,"enterAddressLine1")]'))
  public HouseNumber: Button;

  @findBy(By.xpath('//input[contains(@id,"enterAddressCity")]'))
  public City: Button;

  @findBy(By.xpath('//span[contains(@id,"enterAddressStateOrRegion")]'))
  public State: Button;

  @findBy(By.xpath('(//a[contains(@id,"enterAddressStateOrRegion")])[1]'))
  public SelectState: Button;
  
  @findBy(By.css('a#nav-item-signout'))
  public SignOut: Button;

  public async signIntoAmazon(email: string, pass: string) {
    await this.SignInButton.waitUntilLocatedAndDisplayed();
    await this.SignInButton.click();
    await this.Email.waitUntilLocatedAndDisplayed();
    await this.Email.sendKeys(email);
    await this.Continue.click();
    await this.Password.waitUntilLocatedAndDisplayed();
    await this.Password.sendKeys(pass);
    await this.Login.clickAndWaitStaleness();
  }

  public async searchFunctionality(item: string) {
    await this.SearchBar.waitUntilLocatedAndDisplayed();
    await this.SearchBar.click();
    await this.SearchBar.sendKeys(item);
    await this.SearchBar.sendKeys(Key.ENTER);
    await this.FirstSearchedItem.waitUntilLocatedAndDisplayed();
    await this.searchedText.waitUntilLocatedAndDisplayed();
  }

  public async getFullNameList(): Promise<WebElement[]> {
    return await (await this.browser.getDriver()).findElements(By.xpath('//div[contains(@id,"address-block")]//span[contains(@id,"FullName")]'));
  }

  public async getAddressList(): Promise<WebElement[]> {
    return await this.browser.findElements(By.xpath('//div[contains(@id,"address-block")]//span[contains(@id,"AddressLineOne")]'));
  }

  public async getMobileNumberList(): Promise<WebElement[]> {
    return await this.browser.findElements(By.xpath('//div[contains(@id,"address-block")]//span[contains(@id,"PhoneNumber")]'));
  }
  public async getApp(appName: string): Promise<WebElementPromise> {
    return await this.browser.findElementBySelector(By.xpath(`(//*[name()="use" and @*="#icon-commerceos-${appName}"])[1]`));
  }
}

