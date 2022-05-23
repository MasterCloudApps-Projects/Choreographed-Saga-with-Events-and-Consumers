import {Router} from 'express';
import DebugLib from 'debug';
import {config} from "./configRouter.js";
import uniqid from 'uniqid';

const debug = new DebugLib('server:rest:payment');

export const paymentRoutes = Router();

paymentRoutes.post('/api/payment', async (req, res) => {
  debug('post request', req.body);
  const {delay, response, randomDelay} = config.payment.post;
  await new Promise(resolve => setTimeout(resolve, delay + Math.random() * randomDelay))
  const body = response === 201 ? {...req.body, receiptId: uniqid()} : {paymentCancellationReason: 'payment platform busy'}
  debug('post response', response, body);
  return res.status(response).json(body);
});
