import {Then} from "cypress-cucumber-preprocessor/steps";

Then('all the steps are green', () => {
  Cypress._.times(4, index => {
    cy.get('app-layout').shadow()
      .find('cads-order').shadow()
      .find(`kor-stepper-item[index=${index+1}]`)
      .should('have.attr', 'status', 'success');
    cy.wait(100);
    cy.screenshot();
  });
  cy.wait(1000);
});
