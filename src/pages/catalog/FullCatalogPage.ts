export class FullCatalogPage {
    static recentlyUpdatedSection = '//recently-updated-items';
    
    static simpleCourseTile = '//simple-course-tile';

    static contentList = "//ul[@class='content-list']";

    static contentListItem = "//li[contains(@class,'content-list-item')]";

    static contentSearchInput = "//input[@Placeholder='Search']"

    static contentSearchButton = `${this.contentSearchInput}/..//button`;

    static contentItemTitle = "//div[contains(@class,'course-tile-title')]";
    
    static contentItemPrice = "//div[contains(@class,'tile-course-price')]";

    static contentItemTitleLink = `${this.contentItemTitle}/a`;
}