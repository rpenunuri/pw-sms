import { test } from '@playwright/test';
import { HomePage } from '../pages/homePage';

test.describe('Home Page', () => {
  test('visitor can check how teams use the SimSpace cyber range platform', { tag:'@smoke' }, async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goToHomePage();

    await homePage.clickAcceptCookieButton();
    await homePage.scrollToHowTeamsUseSimspaceHeading();

    const howTeamsUseSimspaceTabList = [
      { name: 'Red Team', title: 'Red Team' },
      { name: 'Blue Team', title: 'Blue Team' },
      { name: 'Purple Team', title: 'Purple Team' },
      { name: 'SOC', title: 'SOC' },
      { name: 'Security Engineering', title: 'Security Engineering' },
      { name: 'IR & Forensics (DFIR)', title: 'IR & Forensics (DFIR)' },
      { name: 'GRC', title: 'Governance, Risk & Compliance' }
    ];

    for (const tab of howTeamsUseSimspaceTabList) {
      await homePage.clickTab(tab.name);
      await homePage.assertTabContentTitleIsVisible(tab.title);
    }
  });
});