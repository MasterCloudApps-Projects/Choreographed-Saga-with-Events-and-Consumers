import {Router} from 'express';
import DebugLib from 'debug';
import {config} from "./configRouter.js";
import uniqid from 'uniqid';
import faker from '@faker-js/faker';

const debug = new DebugLib('server:rest:rider');

export const riderRoutes = Router();

riderRoutes.post('/api/rider', async (req, res) => {
  debug('post request', req.body);
  const {delay, response, randomDelay} = config.rider.post;
  await new Promise(resolve => setTimeout(resolve, delay + Math.random() * randomDelay))
  const body = response === 201 ? {
    ...req.body,
    riderId: uniqid(),
    riderPhone: faker.phone.phoneNumber('+34 6## ## ## ##'),
    riderName: faker.name.findName(),
  } : {riderCancellationReason: 'no rider available'}
  debug('post response', response, body);
  return res.status(response).json(body);
});

riderRoutes.delete('/api/rider', async (req, res) => {
  debug('delete request', req.body);
  const {delay, response, randomDelay} = config.rider.delete;
  await new Promise(resolve => setTimeout(resolve, delay + Math.random() * randomDelay))
  const body = response === 204 ? {} : {riderCancellationReason: 'error'}
  debug('delete response', response, body);
  return res.status(response).json(body);
});
