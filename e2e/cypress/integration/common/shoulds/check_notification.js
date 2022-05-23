import {Then} from "cypress-cucumber-preprocessor/steps";

const basePath = Cypress.env('NOTIFICATIONS_URL') || 'http://localhost:3001';
const apiPath = Cypress.env('NOTIFICATIONS_PATH') || '/api/notifications';

const notificationsContains = {
  finished: 'receiptId',
  'restaurant rejected': 'reason.restaurantCancellationReason',
  'rider rejected': 'reason.riderCancellationReason',
  'payment rejected': 'reason.paymentCancellationReason',
}

Then('after {int} seconds, should receive a {string} notification', (wait, status) => {
  cy.wait(wait * 1000);

  cy.get('@order_label').then(order_label => {
    const orderId = order_label.split('#')[1];
    cy.log('orderID', orderId);
    cy.request({
      url: `${basePath}/${apiPath}/${orderId}`,
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.eq(200);
      const properties = notificationsContains[status].split('.');
      expect(response.body).to.have.property(properties[0]);
      if (properties.length === 2) {
        expect(response.body[properties[0]]).to.have.property(properties[1]);
      }
    });
  });
});
