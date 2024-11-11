class PropertyDetailsPage {

    get detailsPriceElement() { return $('div[aria-label="Property basic info"] span[aria-label="Price"]'); }

    async getDetailsPrice() {
        await this.detailsPriceElement.waitForDisplayed({ timeout: 5000 });
        const detailsPriceText = await this.detailsPriceElement.getText();
        console.log('Property price from Details Page:', detailsPriceText);
        return detailsPriceText;
    }

}

export default new PropertyDetailsPage();