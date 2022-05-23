/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
const cucumber = require('cypress-cucumber-preprocessor').default;
const mongoose = require('mongoose');
const dotenvPlugin = require('cypress-dotenv');

const Schema = mongoose.Schema;
const modelsCache = {};

module.exports = (on, config) => {
  on('file:preprocessor', cucumber());
  require('cypress-mochawesome-reporter/plugin')(on);
  on('task', {
    async checkStatus({mongoUrl, orderId}) {
      const [, , , collection] = mongoUrl.split('/');
      await mongoose.connect(mongoUrl);
      const OrderSchema = new Schema({}, {strict: false});
      const OrderModel = modelsCache[mongoUrl] || mongoose.model(mongoUrl, OrderSchema, collection + 's');
      modelsCache[mongoUrl] = OrderModel;
      const result = await OrderModel.findOne({orderId});
      await mongoose.disconnect();

      return result && result.status >= 0 ? result.status : -1;
    }
  });

    config = dotenvPlugin(config)
    return config
}
