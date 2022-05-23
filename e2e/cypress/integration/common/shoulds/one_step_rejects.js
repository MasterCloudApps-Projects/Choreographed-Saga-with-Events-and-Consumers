import {Then} from "cypress-cucumber-preprocessor/steps";

const services = {
  order: "Pedido",
  restaurant: "Restaurante",
  rider: "Rider",
  payment: "Pago",
};

Then('{string} step is red', service => {
  cy.get('app-layout').shadow()
    .find('cads-order').shadow()
    .find(`kor-stepper-item[label=${services[service]}]`)
    .should('have.attr', 'status', 'error');
  cy.wait(1000);
  cy.screenshot();
});
