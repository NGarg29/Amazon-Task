import "chromedriver";
import {
  Builder,
  ThenableWebDriver,
  By,
  WebElementPromise,
  promise,
} from "selenium-webdriver";

export class Browser {
  private driver: ThenableWebDriver;
  public constructor(private browserName: string) {
    this.driver = new Builder().forBrowser(browserName).build();
  }

  public getDriver(): ThenableWebDriver {
    return this.driver;
  }

  public async navigate(url: string): Promise<void> {
    await this.driver.navigate().to(url);
  }

  public findElementBySelector(selector: By): WebElementPromise {
    return this.driver.findElement(selector);
  }

  public findElements(selector: By) {
    return this.driver.findElements(selector);
  }

  public async sleep(timeout: number) {
    await this.driver.sleep(timeout);
  }

  public async wait(condition: any, timeout: number = 3000): Promise<any> {
    return this.driver
      .wait(condition, timeout)
      .catch((err) => console.log(err, "error"));
  }

  public async close(): Promise<void> {
    await this.driver.quit();
  }
}
