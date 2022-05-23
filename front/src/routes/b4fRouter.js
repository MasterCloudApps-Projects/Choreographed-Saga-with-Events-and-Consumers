import { Router } from 'express';
import { createOrder } from "../services/b4fService.js";

import DebugLib from 'debug';

const debug = new DebugLib('server:rest');

export const routes = Router();

routes.post('/order', async (req, res) => {
  const userId = req.headers['user-key'];
  debug('Order creation request received for user', userId)
  try {
    const {orderId} = await createOrder(req.body, userId);
    debug('Order creation published for user', userId, 'with orderId', orderId)
    return res.status(202).send({orderId, userId});
  } catch (e) {
    return res.status(409).send('Bad request! '+e.message);
  }
});
