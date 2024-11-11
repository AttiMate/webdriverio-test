class SearchResultsPage {

    get firstProperty() { return $('li[role="article"]:first-of-type'); }
    get firstPropertyPriceElement() { return $('li[role="article"]:first-of-type h4 span[aria-label="Price"]') }

    async getFirstPropertyPrice() {
        await this.firstPropertyPriceElement.waitForDisplayed({ timeout: 5000 });
        const priceText = await this.firstPropertyPriceElement.getText();
        console.log('First property price from Search Results Page:', priceText);
        return priceText;
    }

    async clickFirstProperty() {
        await this.firstProperty.waitForClickable({ timeout: 5000 });
        await this.firstProperty.click();
        console.log('Clicked on the first property');
    }
}

export default new SearchResultsPage();