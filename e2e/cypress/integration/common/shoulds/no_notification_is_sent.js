import {Then} from "cypress-cucumber-preprocessor/steps";

const basePath = Cypress.env('NOTIFICATIONS_URL') || 'http://localhost:3001';
const apiPath = Cypress.env('NOTIFICATIONS_PATH') || '/api/notifications';

Then('no notification is sent', () => {
  cy.get('app-layout').shadow()
      .find('cads-order').shadow()
      .find(`kor-card`)
      .invoke('attr', 'label')
      .as('order_label')

  cy.get('@order_label').then(order_label => {
    const orderId = order_label.split('#')[1];
    cy.log('orderID', orderId);
    cy.request({
      url: `${basePath}/${apiPath}/${orderId}`,
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.eq(404);
    });
  });
});
