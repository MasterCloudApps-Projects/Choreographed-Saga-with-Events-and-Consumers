import {When} from 'cypress-cucumber-preprocessor/steps';

function selectRestaurant () {
  cy.get('app-layout').shadow()
    .find('cads-restaurants').shadow()
    .find('[data-test-id="menu-restaurants-Pizzeria"]')
    .click();
}

function selectSomeDishes () {
  Cypress._.times(3, () => {
    cy.get('app-layout').shadow()
      .find('cads-menu').shadow()
      .find('[data-test-id="input-dishes-Pizza margarita"]').shadow()
      .find('[icon="keyboard_arrow_right"]')
      .click();
  });

  Cypress._.times(2, () => {
    cy.get('app-layout').shadow()
      .find('cads-menu').shadow()
      .find('[data-test-id="input-dishes-Pizza bbq"]').shadow()
      .find('[icon="keyboard_arrow_right"]')
      .click();
  });
}

function clickCreateOrder () {
  cy.get('app-layout').shadow()
    .find('cads-menu').shadow()
    .find('[data-test-id="create-order-button"]')
    .click();
}


When('create an order', () => {
  selectRestaurant();
  selectSomeDishes();
  clickCreateOrder();
});
