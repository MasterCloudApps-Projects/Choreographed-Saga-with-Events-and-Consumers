import got from 'got';
import DebugLib from 'debug';

import {sendToUser as sendToUserWS} from '../connections/wsConnection.js';
import {sendToUser as sendToUserSSE} from '../routes/sseRouter.js';
import {CreateOrderDto} from "../dto/CreateOrderDto.js";
import {UpdateRestaurantDto} from "../dto/UpdateRestaurantDto.js";
import {UpdateRiderDto} from "../dto/UpdateRiderDto.js";
import {UpdatePaymentDto} from "../dto/UpdatePaymentDto.js";
import {CancelOrderDto} from "../dto/CancelOrderDto.js";
import {sendCreateOrder} from "../repositories/orderRepository.js";

const debug = new DebugLib('server:service');
const {FRONT_CONNECTION_TYPE} = process.env;

debug('FRONT_CONNECTION_TYPE', FRONT_CONNECTION_TYPE);
const sendToUser = FRONT_CONNECTION_TYPE === 'WS' ? sendToUserWS : sendToUserSSE;

export async function createOrder(order, userId) {
  debug('create order', order, userId);
  const request = new CreateOrderDto(order, userId);
  debug('to save', request);
  return sendCreateOrder(request, userId);
}

export async function updateRestaurant(order, correlationId) {
  debug('update restaurant', order, correlationId);
  const updateDto = new UpdateRestaurantDto(order);
  await sendToUser(correlationId, updateDto);
}

export async function updateRider(order, correlationId) {
  debug('update rider', order, correlationId);
  const updateDto = new UpdateRiderDto(order);
  await sendToUser(correlationId, updateDto);
}

export async function updatePayment(order, correlationId) {
  debug('update payment', order, correlationId);
  const updateDto = new UpdatePaymentDto(order);
  await sendToUser(correlationId, updateDto);
}

export async function cancelOrder(order, correlationId) {
  debug('cancel order', order, correlationId);
  const cancelDto = new CancelOrderDto(order);
  await sendToUser(correlationId, cancelDto);
}
