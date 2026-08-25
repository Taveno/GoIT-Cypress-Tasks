const { Given, When, Then } = require('@cucumber/cucumber');

Given('user is on the {string} page', function (searchPage) {
  this.searchPage = searchPage;
});

When('user searches for the {string} product', function (product) {
  this.product = product;
});

Then('the {string} should be displayed in the search results', function (product) {
  this.foundProduct = product;
});

When('user adds the product to the cart', function () {
  this.addedToCart = true;
});

When('user completes the purchase', function () {
  this.purchaseCompleted = true;
});

Then('the {string} message should be displayed', function (successMessage) {
  this.successMessage = successMessage;
});