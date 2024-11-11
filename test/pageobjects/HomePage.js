class HomePage {

    get searchButton() { return $('a[role="button"][aria-label="Find button"]'); }

    async clickSearchButton() {
        await this.searchButton.waitForClickable({ timeout: 10000 });
        await this.searchButton.click();
        console.log('Search button clicked successfully');
    }
}

export default new HomePage();