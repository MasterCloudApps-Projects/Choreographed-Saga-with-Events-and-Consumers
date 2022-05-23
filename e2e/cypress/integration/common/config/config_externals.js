import {Given} from "cypress-cucumber-preprocessor/steps";

const config = {
  restaurant: {
    post: {
      response: 201,
      delay: 500,
      randomDelay: 1000,
    },
    delete: {
      response: 204,
      delay: 500,
      randomDelay: 1000,
    }
  },
  rider: {
    post: {
      response: 201,
      delay: 500,
      randomDelay: 1000,
    },
    delete: {
      response: 204,
      delay: 500,
      randomDelay: 1000,
    }
  },
  payment: {
    post: {
      response: 201,
      delay: 500,
      randomDelay: 1000,
    }
  }
};

const basePath = Cypress.env('EXTERNALS_URL') || 'http://localhost:3000';
const apiPath = Cypress.env('EXTERNALS_PATH') || '/api/config';

Given('externals configured to return {int} when {string} to {string} service', (code, method, service) => {
  const modifiedConfig = JSON.parse(JSON.stringify(config));
  modifiedConfig[service][method].response = code;
  const path = new URL(apiPath, basePath);
  cy.request('POST', path.toString(), modifiedConfig)
    .its('status')
    .should('be.equal', 202);
});

Given('externals configured to accept all', () => {
  const path = new URL(apiPath, basePath);
  cy.request('POST', path.toString(), config)
    .its('status')
    .should('be.equal', 202);
});
