import { Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
  readonly path: string;
  readonly cookieConfirmationButtonGroup: Locator = this.page.locator('#hs-eu-cookie-confirmation-button-group');
  readonly cookieConfirmationAcceptButton: Locator = this.cookieConfirmationButtonGroup.locator('#hs-eu-confirmation-button');
  readonly tabList: Locator = this.page.locator('.e-n-tabs-heading');
  readonly activeTabContent: Locator = this.page.locator('.e-n-tabs-content .e-active');
  readonly activeTabContentTitle: Locator = this.activeTabContent.locator('h2');
  readonly howTeamsUseSimspaceHeading: Locator = this.page.getByRole('heading', { name: /How teams use the SimSpace cyber range platform/i });

  constructor(page) {
    super(page);
    this.path = this.baseUrl + '/';
  }

  async expectedCondition() {
    await expect(this.page).toHaveTitle(/Tailored cyber range solutions | SimSpace/i);
  }

  async goToHomePage() {
    await this.navigate(this.path);
  }

  async clickAcceptCookieButton() {
    if (await this.cookieConfirmationAcceptButton.isVisible()) {
      await this.cookieConfirmationAcceptButton.click();
    }
  }

  async scrollToHowTeamsUseSimspaceHeading() {
    await this.howTeamsUseSimspaceHeading.scrollIntoViewIfNeeded();
  }

  async clickTab(tabName: string) {
    await this.getTabButton(tabName).click();
  }

  async assertTabContentTitleIsVisible(tabName: string) {
    await expect(this.activeTabContentTitle).toBeVisible();
    await expect(this.activeTabContentTitle).toHaveText(tabName);
  }

  getTabButton(tabName: string): Locator {
    return this.tabList.getByRole('tab', { name: tabName });
  }
}