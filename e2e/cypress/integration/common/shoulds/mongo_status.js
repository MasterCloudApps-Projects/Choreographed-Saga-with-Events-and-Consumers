import {And} from "cypress-cucumber-preprocessor/steps";

const mongoRestaurant = Cypress.env('MONGO_RESTAURANT') || 'mongodb://localhost:27017/restaurant';
const mongoRider = Cypress.env('MONGO_RIDER') || 'mongodb://localhost:27018/rider';
const mongoPayment = Cypress.env('MONGO_PAYMENT') || 'mongodb://localhost:27019/payment';

And('mongo status should be restaurant: {int}, rider: {int}, payment: {int}', (statusRestaurant, statusRider, statusPayment) => {
  cy.get('@order_label').then(order_label => {
    const orderId = order_label.split('#')[1];
    cy.task('checkStatus', {mongoUrl: mongoRestaurant, orderId}).should('eq', statusRestaurant);
    cy.task('checkStatus', {mongoUrl: mongoRider, orderId}).should('eq', statusRider);
    cy.task('checkStatus', {mongoUrl: mongoPayment, orderId}).should('eq', statusPayment);
  });
});
