import {When} from "cypress-cucumber-preprocessor/steps";

const basePath = Cypress.env('FRONT_URL') || 'http://localhost:8888';

When('user closes before get a response', () => {
   //save order label to use it later
   cy.get('app-layout').shadow()
      .find('cads-order').shadow()
      .find(`kor-card`)
      .invoke('attr', 'label')
      .as('order_label')

  const url = new URL('/wait.html', basePath)
  cy.visit(url.toString());
});
