import {Router} from 'express';
import DebugLib from 'debug';
import {config} from "./configRouter.js";
import faker from '@faker-js/faker';
import uniqid from 'uniqid';

const debug = new DebugLib('server:rest:restaurant');

export const restaurantRoutes = Router();

const fakeData = new Map();
function fakeRestaurantData(id) {
  if (!fakeData.has(id)) {
    const newData = {
      restaurantAddress: faker.address.streetAddress(true),
      restaurantPhone: faker.phone.phoneNumber('+34 91 ### ## ##'),
    }
    fakeData.set(id, newData)
  }
  return fakeData.get(id);
}

const fakePrice = new Map();
function fakeCartPrice(cartSymbol) {
  if (!fakePrice.has(cartSymbol)) {
    fakePrice.set(cartSymbol, (10 + Math.random() * 50).toFixed(2))
  }
  return fakePrice.get(cartSymbol);
}

restaurantRoutes.post('/api/restaurant', async (req, res) => {
  debug('post request', req.body);
  const {delay, response, randomDelay} = config.restaurant.post;
  await new Promise(resolve => setTimeout(resolve, delay + Math.random() * randomDelay))
  const body = response === 201 ? {
    ...req.body,
    restaurantValidationId: uniqid(),
    ...fakeRestaurantData(req.body.restaurantId),
    price: fakeCartPrice(Symbol.for(req.body.cart)),
  } : {restaurantCancellationReason: 'restaurant busy'}
  debug('post response', response, body);
  return res.status(response).json(body);
});

restaurantRoutes.delete('/api/restaurant', async (req, res) => {
  debug('delete request', req.body);
  const {delay, response, randomDelay} = config.restaurant.delete;
  await new Promise(resolve => setTimeout(resolve, delay + Math.random() * randomDelay))
  const body = response === 204 ? {} : {restaurantCancellationReason: 'error'}
  debug('delete response', response, body);
  return res.status(response).json(body);
});
