import { expect } from 'chai';
import homePage from '../pageobjects/HomePage';
import searchResultsPage from '../pageobjects/SearchResultsPage';
import propertyDetailsPage from '../pageobjects/PropertyDetailsPage';

describe('Basic Auth and Verify Property Price', () => {
    it('should authenticate, search properties, and verify that the price is consistent between the search and details page', async () => {

        await homePage.clickSearchButton();

        const searchPrice = await searchResultsPage.getFirstPropertyPrice();

        await searchResultsPage.clickFirstProperty();

        const detailsPrice = await propertyDetailsPage.getDetailsPrice();

        expect(searchPrice).to.equal(detailsPrice, 'The property prices do not match between the Search Results and Details Page');

    });
});