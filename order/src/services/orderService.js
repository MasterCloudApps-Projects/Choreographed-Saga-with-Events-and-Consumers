import createDebug from 'debug';
import {cancelOrder, saveOrder, updateOrder} from '../repositories/orderDbRepository.js';
import {publishMessageOrderCreated} from "../repositories/orderEventRepository.js";
import {STATUS_CANCELLED, STATUS_CREATED, STATUS_UPDATED} from "../models/OrderEntity.js";

const debug = createDebug('service:order');

export async function save(orderDto, userId) {
  debug('save orderDto', orderDto, userId);
  const orderCreated = await saveOrder({
    ...orderDto,
    status: STATUS_CREATED,
  });
  debug('orderCreated', orderCreated);
  await publishMessageOrderCreated(JSON.stringify(orderCreated), `${userId}-${orderCreated.orderId}`);
  return orderCreated;
}

export async function update(orderDto) {
  const status = orderDto.status === STATUS_CANCELLED ? STATUS_CANCELLED : STATUS_UPDATED;
  return updateOrder({
    ...orderDto,
    status,
  });
}

export async function cancel(orderDto) {
  return cancelOrder({
    ...orderDto,
    status: STATUS_CANCELLED,
  });
}
