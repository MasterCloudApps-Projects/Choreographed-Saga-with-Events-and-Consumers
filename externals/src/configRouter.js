import {Router} from 'express';
import DebugLib from 'debug';
import {deepMerge} from "./deepMerge.js";

const debug = new DebugLib('server:rest:config');

export const configRoutes = Router();

export const config = {
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
}

configRoutes.get('/api/config', async function (req, res) {
  return res.json(config);
});

configRoutes.post('/api/config', async (req, res) => {
  debug('post request', req.body);
  config.restaurant = deepMerge(config.restaurant, req.body.restaurant);
  config.rider = deepMerge(config.rider, req.body.rider);
  config.payment = deepMerge(config.payment, req.body.payment);
  debug('post response', req.config);
  return res.status(202).json(config);
});
