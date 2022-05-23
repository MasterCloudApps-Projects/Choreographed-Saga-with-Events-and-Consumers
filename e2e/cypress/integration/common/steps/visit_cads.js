import {Given} from "cypress-cucumber-preprocessor/steps";

const url = Cypress.env('FRONT_URL') || 'http://localhost:8888';

Given('access to CADS page', () => {
  cy.visit(url);
});
