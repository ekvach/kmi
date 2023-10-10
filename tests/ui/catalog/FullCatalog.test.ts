import { test, expect } from '@playwright/test';
import { BasePage } from '../../../src/pages/base/BasePage';
import { FullCatalogPage } from '../../../src/pages/catalog/FullCatalogPage';
import { UriProviderUi } from '../../../src/providers/UriProviderUi';
import { CourseDetailsPage } from '../../../src/pages/catalog/CourseDetailsPage';

test.beforeEach(async ({ page }) => {
  await page.goto(UriProviderUi.baseUri);
  await page.locator(BasePage.mainMenuBottom).locator(BasePage.catalogButton).click();
});

test('Verify "Recently Updated" module is displayed', async ({ page }) => {
  const simpleCourceTile = page.locator(FullCatalogPage.simpleCourseTile);
  const recentlyUpdatedSection = page.locator(FullCatalogPage.recentlyUpdatedSection, { has: simpleCourceTile });

  await recentlyUpdatedSection.waitFor({ state: 'visible' });

  const recentlyUpdatedTiles = await recentlyUpdatedSection.locator(simpleCourceTile).all();

  expect(recentlyUpdatedTiles,
    'Course tiles should be displayed in the "Recently Updated" section')
    .toHaveLength(3);
});

test('Verify "All Content" module is displayed', async ({ page }) => {
  const contentItem = page.locator(FullCatalogPage.contentListItem);
  const contentList = page.locator(FullCatalogPage.contentList, { has: contentItem });

  await contentList.waitFor({ state: 'visible' });

  const contentItems = await contentList.locator(contentItem).all();

  expect(contentItems.length,
    'Content items should be displayed in the "All Content" section')
    .toBeGreaterThan(0);
});

test('Verify Content item can be found in "All Content" section', async ({ page }) => {
  const searchValue: string = 'LMS - eCommerce';
  const expectedCourseTitle = ' LMS - eCommerce KMI Infographic  ';
  const expectedCoursePrice = ' $150.00 ';

  await page.locator(FullCatalogPage.contentSearchInput).fill(searchValue);
  await page.locator(FullCatalogPage.contentSearchButton).click();

  await page.waitForResponse(
    resp => resp.url().includes(searchValue.split(' ').join('+')) && resp.status() === 200);

  const contentItem = page.locator(FullCatalogPage.contentListItem);
  const contentList = page.locator(FullCatalogPage.contentList, { has: contentItem });

  await contentList.waitFor({ state: 'visible' });

  const firstItem = (await contentList.locator(contentItem).all())[0];

  expect(await firstItem.locator(FullCatalogPage.contentItemTitle).textContent(),
    'Search result is incorrect for first item')
    .toEqual(expectedCourseTitle);

  expect(await firstItem.locator(FullCatalogPage.contentItemPrice).textContent(),
    'Search result is incorrect for first item')
    .toEqual(expectedCoursePrice);
});

test('Verify navigation into Content item details from searched Content', async ({ page }) => {
  const searchValue: string = 'LMS - eCommerce';
  const expectedCourseTitle = ' LMS - eCommerce KMI Infographic';
  const nonBreakingSpace = String.fromCharCode(160);
  const expectedCoursePrice = ` $150.00 for 90${nonBreakingSpace}day access `;

  await page.locator(FullCatalogPage.contentSearchInput).fill(searchValue);
  await page.locator(FullCatalogPage.contentSearchButton).click();

  await page.waitForResponse(
    resp => resp.url().includes(searchValue.split(' ').join('+')) && resp.status() === 200);

  const contentItem = page.locator(FullCatalogPage.contentListItem);
  const contentList = page.locator(FullCatalogPage.contentList, { has: contentItem });

  await contentList.waitFor({ state: 'visible' });

  const firstItem = (await contentList.locator(contentItem).all())[0];
  await firstItem.locator(FullCatalogPage.contentItemTitleLink).click()

  expect(await page.locator(CourseDetailsPage.courseTitle).textContent(),
    'Course title should be correct on the details page')
    .toEqual(expectedCourseTitle);

  expect(await page.locator(CourseDetailsPage.coursePriceTitle).textContent(),
    'Course price should be correct on the details page')
    .toEqual(expectedCoursePrice);
});